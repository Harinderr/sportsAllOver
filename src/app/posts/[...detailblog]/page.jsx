'use client'
import styles from "./detailblog.module.css"
import Image from "next/image"
import Menu from "@/components/menu/menu"
import Comment from "@/components/comment/comment"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useSearchParams } from "next/navigation"
import { comment } from "postcss"

export default function DetailBlog({params}) {
 const searchParams = useSearchParams()
 const slug = searchParams.get('slug')

 const [selectedid , setSelectedId] = useState()
   
   const [data, setData] = useState({})
   
 
   
    async function getBlog(id) {
      try{
        let response = await fetch(`http://localhost:3000/api/posts/${id}?slug=${slug}`)
        if(response.ok) {
          let { result }= await response.json()
          setData(result)
        console.log(result)
          
        }
      }
     catch(err) {
      console.log('there is an erro'+ err)
    }
  }
  useEffect(() => {
    const id = params.detailblog[0];
    console.log(id)
    setSelectedId(id)
    getBlog(id);
  
}, [params.detailblog]);
    return (
        <div className={styles.blog_box}>
        <div className={styles.container}>
      
<div className={styles.wrapper}>
     <h1 className={styles.heading}>{data.title}</h1>
      <div className={styles.user}>
        <img src={data.img} alt="" />
        <div className={styles.userDetail}>
            <p>{data.user?.name}</p>
            <p>{data.createdAt}</p>
        </div>
      </div>
      <div className={styles.content}>
    <img src="/market.jpg" alt="no image" />
      <p className={styles.description}>{data.des}</p>
        </div>
        <Comment id={selectedid} slug={slug}></Comment>
        

        </div>
        
        <Menu></Menu>
    </div> 
    
    </div>
        
    )
}