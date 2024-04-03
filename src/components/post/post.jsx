import Image from "next/image"
import Link from "next/link"
import styles from "@/components/post/post.module.css"

export default function Post({src,title,content,date,id,slug}) {
    const dateobj = new Date(date);
    const todayDate = new Date()
    let simpledate;
    //   dateobj.toISOString().split('T')[0];
    const titletextLimit = title.substring(0,50) + '...';
    const contentTextLimit = content.substring(0,80) + '...';
    (function time() {
       let year =  dateobj.getFullYear()
       let month = dateobj.getMonth()
       let date = dateobj.getDate()
       if(todayDate.getDate() == date && todayDate.getMonth() == month && todayDate.getFullYear() == year ){
          return simpledate = 'Today' 
       }
      else  if((todayDate.getDate() - 1) == date && todayDate.getMonth() == month && todayDate.getFullYear() == year ){
         return   simpledate = 'Yesterday' 
       }
       else {
         return simpledate =  dateobj.toISOString().split('T')[0];
       }
    })()
    
   
    return (
        <div className={`${styles.post_container} w-full h-64 relative`} key={id}>
          <div className={styles.content}>
          <Link href={`/posts/${id}?slug=${slug}`} className="m-4">{titletextLimit}</Link>
          <p className={styles.paragraph}>{contentTextLimit} </p> </div>  
            <Image alt="no image" className="w-full h-40" src={src} width={300} height={300} ></Image>
            <div className={`${styles.time} absolute bottom-2 right-2`}> <i className="fa-solid fa-clock"></i> {simpledate}</div>
        </div>
    )
}