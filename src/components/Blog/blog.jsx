'use client'
import Post from "@/components/post/post"
import Menu from "../menu/menu"
import styles from "@/components/Blog/blog.module.css"
import { useContext, useEffect, useState } from "react"
// import { messageContext } from "@/contextapi/messageContext"
export default function Blog() {
    const [data ,setData] = useState([])
    // const {id, setId} = useContext(messageContext)
    async function blogData() {
     try{
        let response = await fetch('http://localhost:3000/api/blogdata')
        if(response.ok) {
            let {result }= await response.json()
        
        setData(result)
        }
     }
     catch(err){
        console.log('There is an error');
     }   
    }
    
    useEffect(() => {
        blogData()
    },[])

    console.log(data)
    return (
       <div className={styles.main_container}>
        <h1 className=" pl-16 py-10 ">LATEST</h1>
        <div className={styles.wrapper}>
         <div className={`${styles.blog_container} flex flex-col w-2/3  gap-4 flex-wrap`}>
        
 
           { data.map((val,index)=> {
            return  <Post key={index} src={'/coding.png'} title={val.title} content={val.content} date ={val.createdAt} id = {val._id}  ></Post>
           })}
        
        {/* { <Post src={'/market.jpg'}></Post>
        <Post src={'/food.png'}></Post> } */}
       
        </div>
        <Menu></Menu>
        </div>
       
        </div>
       
    )
    }