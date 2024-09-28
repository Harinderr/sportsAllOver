'use client'
import Blog from "@/components/Blog/blog";
import Search from "@/components/searchBar/search";
import { useEffect, useState } from "react";
import Post from "@/components/post/post";
import styles from "./search.module.css"



export default function SearchBlog({searchParams}) {
    const { postslug } = searchParams
    
    const [data, setData] = useState([])

   
   useEffect(()=> {

    const handleSearch = async () => {
        try {
            
            const response = await fetch(`https://next-blog-sand-ten-63.vercel.app/api/search?postslug=${postslug}`)
            if(response.ok) {
                const {result}= await response.json()
                console.log(result)
                setData(result)
                
                

            }
        } catch (err) {
          console.log('error here '+ err)
        }
    }
    handleSearch()
    
   },[postslug])
    console.log(data)
   
    return (
        <>
         <Search></Search>
         <div className={`${styles.container} bg-bgBlack `}>
            <div className="wrapper flex gap-4 flex-col sm:px-5 md:px-32 lg:px-40">
         {data.map((val)=> {
            return <Post key={val.id} src={val.img} slug={val.slug} title={val.title} content={val.des} date ={val.createdAt} id = {val.id}></Post> 
        })}
        </div>
         </div>
        
        </>
       

    )
}
