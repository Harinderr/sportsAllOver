import Image from "next/image"
import styles from "@/components/featureSection/feature.module.css"
export default function Feature() {
    return (
        <div className= {` ${styles.features}  `}>
        <div className={`${styles.image_container} relative w-1/2`}>
            <Image className={styles.image} src={'/p1.jpeg'} alt="no image" width={400} height={400}></Image>
        </div>
        <div className={`${styles.right} w-1/2 overflow-hidden`}>
            <h1 className={styles.heading}>Lorem ipsum dolor sit amet consectetur.</h1>
            <p className={styles.pg}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate dicta a, harum consequuntur cum, soluta qui architecto obcaecati voluptate excepturi nam? Exercitationem nostrum dolorum illo, dolor voluptatibus deleniti dolores?</p>
          <button className={styles.btn}>Read More</button>
        </div>
        </div>
    )
}