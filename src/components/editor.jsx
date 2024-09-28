'use client';
import React, { useState } from 'react';
import { app } from "@/utility/firebase";
import { Editor, EditorState, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-js-export-html';
import {getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
 // Import Firebase storage
import 'draft-js/dist/Draft.css'; // Import default styles
const storage = getStorage(app)
const MyEditor = ({editorState, setEditorState}) => {
  // Function to handle key commands (e.g., Bold, Italic via keyboard shortcuts)
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  // Toggle Bold inline style
  const toggleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };
  const toggleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  // Toggle Block Type (e.g., Header)
  const toggleBlockType = () => {
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'));
  };

  // Add an image as an entity (just as an example)
  const addImage = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
      src: '/public/fashion.png', // Replace with actual image URL
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
  };

  // Export the content as HTML
  // const getHtmlContent = () => {
  //   const content = editorState.getCurrentContent();
  //   const html = convertToHTML(content);
  //   console.log('HTML Content:', html);
  // };

  // Export the content as Raw JSON (for storing in DB)
  
  // Upload the image to Firebase
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    let time = new Date();
      let filename = time.getTime() + file.name;
    // Firebase storage reference
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Track the upload progress and handle completion
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Track progress (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
      },
      (error) => {
        console.error("Image upload error:", error);
      },
      () => {
        // On successful upload, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("Image available at:", downloadURL);
          insertImage(downloadURL);  // Insert image in editor
        });
      }
    );
  };

  // Insert the uploaded image into Draft.js
  const insertImage = (imageUrl) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: imageUrl });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
  };
  // Block renderer to render atomic blocks like images
  const blockRendererFn = (block) => {
    if (block.getType() === 'atomic') {
      return {
        component: ImageComponent,
        editable: false, // Ensures the block can't be edited
      };
    }
    return null;
  };

  // ImageComponent to display the image
  const ImageComponent = (props) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    return <img src={src} alt="Uploaded" style={{ maxWidth: '100%' }} />;
  };

  return (
    <div className='bg-bgBlack flex flex-col justify-between ' style={{ border: '1px solid #ddd', padding: '10px', minHeight: '200px' }}>
      <Editor 
         editorState={editorState}
        onChange={setEditorState} 
        handleKeyCommand={handleKeyCommand}
        blockRendererFn={blockRendererFn}  // Add block renderer
      />
    <div className='flex flex-row flex-wrap gap-2 mt-2'>
  <button 
  onClick={toggleBold} 
    className='bg-inputBg  text-sm text-white px-4 py-2 rounded-lg active:bg-white active:text-black focus:bg-white focus:text-black'>
    Bold
  </button>
  <button 
  onClick={toggleItalic} 
    className='bg-inputBg text-sm text-white px-4 py-2 rounded-lg active:bg-white active:text-black focus:bg-white focus:text-black'>
    <i>Italics</i>
  </button>
  <button 
  onClick={toggleBlockType} 
    className='bg-inputBg text-sm text-white px-4 py-2 rounded-lg active:bg-white active:text-black focus:bg-white focus:text-black'>
    Heading
  </button>
  <input 
    className='bg-inputBg text-sm text-white px-4 py-2 rounded-lg cursor-pointer focus:bg-white active:bg-white focus:text-black active:text-black' 
    type="file" 
    accept="image/*" 
    placeholder='Add File' 
    onChange={handleImageUpload} 
  />   
</div>

    </div>
  );
};

export default MyEditor;
