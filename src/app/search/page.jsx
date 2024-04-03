'use client'
import Blog from "@/components/Blog/blog";
import Search from "@/components/searchBar/search";
import { useEffect, useState } from "react";
import Post from "@/components/post/post";
import styles from "./search.module.css"



export default function SearchBlog({searchParams}) {
    const { postslug } = searchParams
    const [data, setData] = useState([])

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/search?postslug=${postslug}`)
            if(response.ok) {
                const {result}= await response.json()
                console.log(result)
                setData(result)
                
                

            }
        } catch (err) {
          console.log('error here '+ err)
        }
    }
   useEffect(()=> {
   const func = async () => {
        await handleSearch()
    }
    func()
    
   },[])
    console.log(data)
   
    return (
        <>
         <Search></Search>
         <div className={styles.container}>
            <div className="wrapper px-48">
         {data.map((val)=> {
            return <Post  src={val.img} slug={val.slug} title={val.title} content={val.des} date ={val.createdAt} id = {val.id}  ></Post>
        })}
        </div>
         </div>
        
        </>
       

    )
}