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

 
 const [data, setData] = useState({})
 const image = data.user?.image
 const firstLetter = data.user?.name.slice(0,1).toUpperCase() 
 const [selectedid , setSelectedId] = useState()
 

const date = new Date(data.createdAt);

const year = date.getFullYear();
const month = date.getMonth() + 1; // Add 1 to month since getMonth() returns zero-based month index
const day = date.getDate();
   const time = `${day}-${month}-${year}`
    async function getBlog(id) {
      try{
        let response = await fetch(`http://localhost:3000/api/posts/${id}?slug=${slug}`)
        if(response.ok) {
          let { result }= await response.json()
          setData(result)
      
        
          
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
       {image  ? <img src={data.user?.image} alt="" /> : 
            <div className="box w-8 h-8  bg-red-300 text-black flex justify-center align-middle rounded-full text-md font-bold "><p className="drop-shadow-md">{firstLetter}</p></div>
           }
        <div className={styles.userDetail}>
            <p>{data.user?.name}</p>
            <p>{time}</p>
        </div>
      </div>
      <div className={styles.content}>
    <img src={data?.img} alt="no image" />
      <p className={styles.description}>{data.des}</p>
        </div>
        <Comment id={selectedid} slug={slug}></Comment>
        

        </div>
        <div className={styles.menu_Wrapper}>
        <Menu></Menu>
        </div>
       
    </div> 
    
    </div>
        
    )
}