'use client'
import { app } from '@/utility/firebase';
import styles from './write.module.css'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation';
const storage = getStorage(app);
export default function Write(){
   const [file, setFile] = useState('')
   const[title, setTitle] = useState('')
   const [des ,setDes] = useState('')
   const [url, setUrl] = useState('')
   const [cat, setCat]= useState('cricket')
   const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if(url == ''){
        console.log('there is an error img')
        return null
      }
        const slugMaker = (val) => {
         let slug = val.toLowerCase().split(' ').join('-')
         return slug
        }
        const res = await fetch('http://localhost:3000/api/posts',{
            method: 'POST',
            body : JSON.stringify({
                title : title,
                des : des,
                img : url,
                slug : slugMaker(title),
                catSlug : cat
            })
        })
        if(res.ok) {
            alert('data sent')
            router.push('/')
        }
    }
    catch(err) {
        console.log('there is an eroro while sending data')
    }
   }

   useEffect(()=> {
    const upload = () => {
        let time = new Date()
        let filename = time.getTime() + file.name
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, file);
// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
(snapshot) => {
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
  // Handle unsuccessful uploads
}, 
() => {
  // Handle successful uploads on complete
  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    console.log('File available at', downloadURL);
    setUrl(downloadURL)
  });
}
);
    }
    file && upload()
   },[file])
    return(
        <div className={styles.container}>
         
         <div  className="flex flex-col gap-4 w-4/5 mx-auto py-16">
            <input type="text" className={styles.title} name="title" onChange={(e)=> setTitle(e.target.value)} placeholder="Enter blog title..." />
            <input type="file" onChange={(e)=> setFile(e.target.files[0])} />
            <label htmlForfor="options">Select an Category:</label>
  <select className={styles.options} id="options" name="" onChange={(e)=>{ 
    e.preventDefault()
    setCat(e.target.value)}}>
    <option value="cricket">Cricket</option>
    <option value="football"> Football</option>
    <option value="tennis"> Tennis</option>
    <option value="chess"> Chess</option>
    <option value="athletics"> Athletics</option>
    <option value="hockey"> Hockey</option>
    
    
  </select>
            <textarea className={styles.des} onChange={(e)=> setDes(e.target.value)} name="des" id="des" cols="30" rows="10"></textarea>
            <button  onClick={(e)=> handleSubmit(e)} className='bg-blue-600 p-4 rounded-t-md text-lg capitalize  '>Publish</button>
         </div>
        </div>
    )
} 