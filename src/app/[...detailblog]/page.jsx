'use client'
import styles from "./detailblog.module.css"
import Image from "next/image"
import Menu from "@/components/menu/menu"
import Comment from "@/components/comment/comment"
import { useEffect, useState } from "react"
export default function DetailBlog({params}) {
    const[selectedId, setSelectedId] = useState(null)
   const [data, setData] = useState({})
  //  const dateobj = new Date(data.createdAt);
  //  const simpledate  =   dateobj.toISOString().split('T')[0];
   
    async function getBlog(id) {
      try{
        let response = await fetch(`http://localhost:3000/api/${id}`)
        if(response.ok) {
          let {result }= await response.json()
          setData(result)
        }
      }
     catch(err) {
      console.log('there is an erro'+ err)
    }
  }
  useEffect(() => {
    const id = params.detailblog[1];
    setSelectedId(id);
    getBlog(id);
  
}, [params.detailblog]);
console.log(data)
    return (
        <div className={styles.blog_box}>
        <div className={styles.container}>
      
<div className={styles.wrapper}>
     <h1 className={styles.heading}>{data.title}</h1>
      <div className={styles.user}>
        <img src="/style.png" alt="" />
        <div className={styles.userDetail}>
            <p>John simons</p>
            {/* <p>{simpledate}</p> */}
        </div>
      </div>
      <div className={styles.content}>
    <img src="/market.jpg" alt="no image" />
      <p className={styles.description}>{data.content}</p>
        </div>
        <Comment></Comment>
        

        </div>
        
        <Menu></Menu>
    </div> 
    
    </div>
        
    )
}