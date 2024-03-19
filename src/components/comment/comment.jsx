import styles from "./comment.module.css"
import { wordLimit } from "@/utility/wordlimit"
export default function Comment() {

    let text = ' Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio natus eligendi illo doloribus nisi quis reiciendis, quam incidunt placeat obcaecati, ut explicabo, pariatur consequatur cupiditate atque delectus quos. Sit, praesentium.'
   const review =  wordLimit(text,20)
    return (
        <div className={styles.container}>
            <div className={styles.comment_form}>
                <form action="">
                    <label htmlFor="comment">Comments</label>
                    <input type="text" name="comment" id="comment" placeholder="Enter you comment" />
                </form>
                <div className={styles.comment_container}>
                    <div className={styles.user}>
                   <img src="/fashion.png" alt="" />
                   <div className="detail">
                    <p>Tom Latham</p>
                    <p>21/2/2021</p>
                   </div>
                    </div>
                    <div className={styles.comment}>
            {review}
                    </div>
                </div>
                <div className={styles.comment_container}>
                    <div className={styles.user}>
                   <img src="/fashion.png" alt="" />
                   <div className="detail">
                    <p>Tom Latham</p>
                    <p>21/2/2021</p>
                   </div>
                    </div>
                    <div className={styles.comment}>
                      {review}
                    </div>
                </div>
                <div className={styles.comment_container}>
                    <div className={styles.user}>
                   <img src="/fashion.png" alt="" />
                   <div className="detail">
                    <p>Tom Latham</p>
                    <p>21/2/2021</p>
                   </div>
                    </div>
                    <div className={styles.comment}>
                      {review}
                    </div>
                </div>
            </div>
        </div>
    )
}