import styles from "@/components/menu/menu.module.css"
import Post from "../post/post"
import Image from "next/image";
import PopularPost from "../popularpost/popularpost"
import { useEffect, useState } from "react";
export default function Menu() {
   const [data, setData] = useState([])
    
   async function getData() {
       try {
           const res = await fetch('http://localhost:3000/api/popular')
           if (res.ok){
               const { result } = await res.json()
               setData(result)
               
           }
           
       } catch (error) {
           console.log('there is an error')
       }
   }
  useEffect(()=> {
   getData()
  },[])
     return (
        <div className={styles.menu_container}>
            <h4 className={styles.heading}>Most Popular</h4>
           
            {data.map((item)=> {
               return   <PopularPost key={item.id} id={item.id} src = {item.img} title={item.title} des={item.des} slug={item.slug}></PopularPost>
            })}
          
           
        </div>
     )
}