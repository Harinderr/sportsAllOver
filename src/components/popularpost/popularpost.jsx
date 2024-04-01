 import styles from "./popularpost.module.css"
 import Link from "next/link";
 import Image from "next/image";

 
export default function PopularPost({id, title, des,slug}) {
    const fulldate = new Date()
    const date  =   fulldate.toISOString().split('T')[0];
   

    return (

        
        <div className={`${styles.post_container}`} key={id}>
          <div className={styles.content}>
          <Link href={`/posts/${id}?slug=${slug}`} className="font-bold">{title.substring(0,50)+'...'}</Link>
          <p className={styles.paragraph}>{des.substring(0,60)+'...'}</p>
            </div>  
            <Image alt="no image" src={'/food.png'} width={50} height={50} ></Image>

        </div>
    )
}