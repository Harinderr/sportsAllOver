import { useCallback, useEffect, useState } from "react";
import styles from "./comment.module.css"
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Comment({ slug}) {
    const {data,status}= useSession()
   
 
   const [formData, setFormData]= useState({})
   const[comment, setComment] = useState([])
   
  const  commentData = async () => {
    try {
        let response = await fetch(`https://next-blog-sand-ten-63.vercel.app/api/comment?slug=${slug}`)
        if(response.ok) {
            const { comments } = await response.json()
            comments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setComment(comments)
            console.log(comments)
        }
    }
    catch (err) {
        throw new Error('Data not fetched')
    }
}
//    const firstLett comment.user?.name.slice(0,1).toUpperCase() 
   function handleChange(e) {
    let {name, value} = e.target;
   setFormData({...formData, [name]:value})
   
}

function convertTime(val) {
    const date = new Date(val);
    const year = date.getFullYear();
const month = date.getMonth() + 1; // Add 1 to month since getMonth() returns zero-based month index
const day = date.getDate();
   const time = `${day}-${month}-${year}`
   return time
}




async   function handleLogin(e) {
    e.preventDefault();
    if(status == 'unauthenticated'){
        alert('login to comment')
        return false
    }
    try {
        const response = await fetch(`https://next-blog-sand-ten-63.vercel.app/api/comment?slug=${slug}`, {
            method : 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body : JSON.stringify(formData)
        })
        if(response.ok){
            let result = await response.json()
            console.log('data send')
            commentData()
            
            
        }
     }  
     catch(err) {
        console.log('There is an error' + err)
     } 
}
 
useEffect(() => {
  

    commentData()

},[slug])

    return (
        <div className={styles.container}>
            
                <form onSubmit={(e)=> handleLogin(e)} action="" className="flex flex-row gap-2">
                    <label htmlFor="comment">Comment</label>
                    <input onChange={(e)=> handleChange(e)} type="text" name="comment" id="comment" placeholder="Enter you comment" className="outline-none"/>
                    <button type="submit" className="bg-blue-600 px-4">Post</button>
                </form>
                <div className={styles.comment_form}>
             { comment.map((item)=> {
                return (<div className={styles.comment_container} key={item.id} >
                    <div className={styles.user}>
                  { item.user?.image ? <Image src={item.user.image} alt="Image Unavailable"></Image> :  <div className="box w-8 h-8  bg-red-300 text-black flex justify-center align-middle rounded-full text-md font-bold "><p className="drop-shadow-md">{item.user.name.slice(0,1).toUpperCase()}</p></div>}
                   <div className="detail">
                    <p>{item.user.name}</p>
                    <p>{convertTime(item.createdAt) }</p>
                   </div>
                    </div>
                    <div className={styles.comment}>
            {item.des}
                    </div>
                </div>)
             })  } 
               
                </div>
            </div>
        
    )
}