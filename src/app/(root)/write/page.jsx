 "use client";
import { app } from "@/utility/firebase";
import styles from "./write.module.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyEditor from "@/components/editor";
import { useSession } from "next-auth/react";
import { convertToRaw, EditorState } from "draft-js";
const storage = getStorage(app);
export default function Write() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const {data : session} = useSession()
  const [title, setTitle] = useState("");
  const [subDes , setSubDes] = useState('')
  const [file, setFile] = useState('')
  const [url, setUrl] = useState('')
  const [cat, setCat] = useState("cricket");
  const router = useRouter();

  const getRawContent = async () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const jsonformed = JSON.stringify(raw)
    return jsonformed
  };
  
  function extractImageUrls() {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
  
    // Collect image URLs from blocks
    const imageUrls = [];
    rawContent.blocks.forEach((block) => {
      if (block.type === 'atomic' && block.entityRanges.length > 0) {
        block.entityRanges.forEach((range) => {
          const entity = rawContent.entityMap[range.key];
          if (entity.type === 'IMAGE') {
            imageUrls.push(entity.data.src); // assuming image src is stored in entity data
          }
        });
      }
    });
    setUrl(imageUrls[0])
    return imageUrls;
  }



  async function handleSubmit(e) {
    e.preventDefault();
    const imageUrls = extractImageUrls()
    console.log(imageUrls)
    try {
     const content =  await getRawContent()
      if(url == ''){
        console.log('there is an error img')
        return null
      }
      const slugMaker = (val) => {
        let slug = val.toLowerCase().split(" ").join("-");
        return slug;
      };
     
      const res = await fetch("https://next-blog-sand-ten-63.vercel.app/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          des: content,
          img : url,
          imgUrls : imageUrls,
          subDes : subDes,
         slug: slugMaker(title),
          catSlug: cat,
        }),
      });
      if (res.ok) {
        alert("data sent");
        router.push("/");
      }
    } catch (err) {
      console.log("there is an eroro while sending data");
    }
  }

  useEffect(()=> {
    const upload = () => {
        let time = new Date()
        let filename = time.getTime() + file.name
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);

uploadTask.on('state_changed', 
(snapshot) => {
  
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
 console.error(error)
}, 
() => {
  
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    setUrl(downloadURL)
  });
}
);
    }
    file && upload()
   },[file])
 
   useEffect(() => {
    if(session?.user?.role != 'admin') {
      router.push('/')
    }
   },[session])
 
  return (
    <div className={styles.container}>
      <h1 className="text-center text-xl sm:text-4xl py-10">Write a <span className="text-blue-600">Blog</span> </h1>
      <div className="flex flex-col gap-8 w-4/5 mx-auto pb-32">
      <label htmlFor="title">Title</label>
        <input
          type="text"
          className={styles.title}
          name="title"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter blog title..."
        />
        <label htmlFor="subDes">Sub-Description</label>
        <input onChange={(e) => setSubDes(e.target.value)} type="text" className={styles.title} placeholder="Enter sub descriptionm (min 20 words) " />

        <label htmlFor="Choose">Choose Banner (only in case of no image in blog content) </label>
        <input type="file"  onChange={(e) => setFile(e.target.files[0])}/>
        <label htmlFor="options">Select a Category:</label>
        <select
          className={styles.options}
          id="options"
          name=""
          onChange={(e) => {
            e.preventDefault();
            setCat(e.target.value);
          }}
        >
          <option value="cricket">Cricket</option>
          <option value="football"> Football</option>
          <option value="tennis"> Tennis</option>
          <option value="chess"> Chess</option>
          <option value="athletics"> Athletics</option>
          <option value="hockey"> Hockey</option>
          <option value="badminton">Badminton</option>
        </select>
         <MyEditor editorState={editorState} setEditorState={setEditorState}></MyEditor>
        <button
          onClick={(e) => handleSubmit(e)}
          className="bg-blue-600 p-4 rounded-t-md text-lg capitalize  "
        >
          Publish
        </button>
      </div>
    </div>
  );
}



