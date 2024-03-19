 import styles from "./popularpost.module.css"
 import Link from "next/link";
 import Image from "next/image";
 
export default function PopularPost({src}) {
    const fulldate = new Date()
    const date  =   fulldate.toISOString().split('T')[0];
    console.log(date)
    return (
        <div className={`${styles.post_container}`}>
          <div className={styles.content}>
          <Link href="/">Lorem repudiandae placeat  ipsum dolor sit amet</Link>
          <p className={styles.paragraph}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita id illum, quia ipsa non nemo eos dicta aperiam rem...</p>
            </div>  
            <Image alt="no image" src={'/food.png'} width={50} height={50} ></Image>

        </div>
    )
}