import Link from "next/link"
import styles from "./footer.module.css"
import Image from "next/image"
export default function Footer() {
    return (
       <footer className={styles.footer}>
        <div className={styles.container}>
            <div className={styles.info}>
                <Image src={'/logo.png'} alt="Image unavailable" height={40} width={40}></Image>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate consectetur magnam temporibus, dignissimos provident asperiores quasi inventore saepe optio amet quos debitis laborum a soluta unde. Quas maxime facilis cupiditate?</p>
            </div>
            <div className={styles.links}>
                <div className={styles.navigation}>
                    <h3>Navigation</h3>
                    <Link href="/">Home</Link>
                    <Link href="#latest" >Latest</Link>
                    <Link href="/" >Reviews</Link>
                    <Link href="#menu_container" >Most Popular</Link>
                </div>
                <div className={styles.social}>
                    <h3>Social</h3>
                <Link href="/">Facebook</Link>
                    <Link href="/" >Twitter</Link>
                    <Link href="/" >Linkdin</Link>
                    <Link href="/" >Instagram</Link>
                </div>
            </div>
        </div>
       </footer>
    )
}