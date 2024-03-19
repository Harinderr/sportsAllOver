import styles from "@/components/menu/menu.module.css"
import Post from "../post/post"
import PopularPost from "../popularpost/popularpost"

export default function Menu() {

     return (
        <div className={styles.menu_container}>
            <h4 className={styles.heading}>Most Popular</h4>
           <PopularPost></PopularPost>
           <PopularPost></PopularPost>
           <PopularPost></PopularPost>
        </div>
     )
}