import Image from "next/image"
import styles from "@/components/featureSection/feature.module.css"
export default function Feature() {
    return (
        <div className= {` ${styles.features}  `}>
        <div className={`${styles.image_container} relative w-1/2`}>
            <Image className={styles.image} src={'/main.svg'} alt="no image" width={300} height={300}></Image>
        </div>
        <div className={`${styles.right} w-1/2 overflow-hidden`}>
            <h1 className={styles.heading}>Play and Enjoy the sports</h1>
            <p className={styles.pg}>Get the blogs on latest sports events, match reviews, player interviews, fantasy, sports training and mental and physical health</p>
          
        </div>
        </div>
    )
}