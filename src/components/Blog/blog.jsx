'use client'
import Post from "@/components/post/post"
import Menu from "../menu/menu"
import styles from "@/components/Blog/blog.module.css"
import { useContext, useEffect, useState } from "react"
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation"
// import { messageContext } from "@/contextapi/messageContext"
export default function Blog({page,cat}) {
   
    const [data ,setData] = useState([])
    const [count , setCount] = useState(3)
    const pathname = usePathname()
   
    let previous = page == 1 ? false : true;
    let next = page == Math.ceil(count/3)  ? false : true  ;
    const router = useRouter()
    
     function handlePagination(path,page,operator){
      
        if(operator=='add'){
            page += 1
            path == '/' &&   router.push(`/?page=${page}`)  
            path == '/blog' &&  router.push(`/blog?page=${page}&cat=${cat}`)
        
           
        }
        if(operator =='minus') {
          if(page==1){
            path == '/' &&   router.push(`/?page=${1}`)  
            path == '/blog' &&  router.push(`/blog?page=${1}&cat=${cat}`)
        
        

          } 
          else {
          page -= 1
          path == '/' &&   router.push(`/?page=${page}`)  
         path == '/blog' &&  router.push(`/blog?page=${page}&cat=${cat}`)
        
          
        }
    }
    }
    // const {id, setId} = useContext(messageContext)
   

    
    
    useEffect(() => {
        async function blogData() {
            try{
       
               let response = await fetch(`https://next-blog-sand-ten-63.vercel.app//api/blog?page=${page}&cat=${cat || '' }`)
               if(response.ok) {
                   let {result ,count }= await response.json()
               
               setData(result)
               setCount(count)
               }
            }
            catch(err){
               console.log('There is an error');
            }   
           // try {
           //     const response = await fetch('')
           // }
           // catch(err){
           //     throw new Error('there is an error')
           // }
       }
        blogData()
           
    },[page,cat])

   
    return (
       <div className={styles.main_container}>
        <h1 className=" pl-16 py-10 " id="latest">LATEST</h1>
        <div className={styles.wrapper}>
         <div className={`${styles.blog_container} flex flex-col w-2/3  gap-4 flex-wrap`}>
        
 
           { data.map((val)=> {
            return  <Post key={val.id} src={val.img} slug={val.slug} title={val.title} content={val.des} date ={val.createdAt} id = {val.id}  ></Post>
           })}
        
       <div className={`${styles.pagination} flex justify-between`}>
           <button className="bg-red-600 text-white p-2" disabled={!previous} onClick={(e)=> handlePagination(pathname,page,'minus')} >Previous</button>
           <button className="bg-red-600 text-white p-2" disabled={!next} onClick={(e)=> handlePagination(pathname,page,'add')} >Next</button>

       </div>
        </div>
        <div className={styles.menu_wrapper}>
        <Menu></Menu>
        </div>
        </div>
       
        </div>
       
    )
    }