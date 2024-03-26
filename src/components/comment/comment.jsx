import { useEffect, useState } from "react";
import styles from "./comment.module.css"
import { wordLimit } from "@/utility/wordlimit"
export default function Comment({ id,slug}) {
 
 
   const [formData, setFormData]= useState({})
   const[comment, setComment] = useState([])
   function handleChange(e) {
    let {name, value} = e.target;
   setFormData({...formData, [name]:value})
   
}

async function commentData() {
    try {
        let response = await fetch(`http://localhost:3000/api/comment?slug=${slug}`)
        if(response.ok) {
            const { comments } = await response.json()
            setComment(comments)
            console.log(comments)
        }
    }
    catch (err) {
        throw new Error('Data not fetched')
    }
}

async   function handleLogin(e) {
    e.preventDefault();
    try {
        const response = await fetch(`http://localhost:3000/api/comment?slug=${slug}`, {
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

},[])
    return (
        <div className={styles.container}>
            <div className={styles.comment_form}>
                <form onSubmit={(e)=> handleLogin(e)} action="" className="flex flex-row gap-2">
                    <label htmlFor="comment">Comment</label>
                    <input onChange={(e)=> handleChange(e)} type="text" name="comment" id="comment" placeholder="Enter you comment" className="outline-none"/>
                    <button type="submit" className="bg-blue-600 px-4">Post</button>
                </form>
             { comment.map((item)=> {
                return (<div className={styles.comment_container} key={item.id} >
                    <div className={styles.user}>
                   <img src="/fashion.png" alt="" />
                   <div className="detail">
                    <p>{item.user.name}</p>
                    <p>{item.createdAt}</p>
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