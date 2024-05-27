import Link from "next/link";
import styles from "./footer.module.css";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.info}>
          <Image
            src={"/logo.png"}
            alt="Image unavailable"
            height={40}
            width={40}
          ></Image>
          <p>
            Blogpost is a platform where we post blogs covering all major sports, our analysis, and all the coming events of all major sports.
          </p>
        </div>
        <div className={styles.links}>
          <div className={styles.navigation}>
            <h3>Navigation</h3>
            <Link href="/">Home</Link>
            <Link href="#latest">Latest</Link>
            <Link href="/">Reviews</Link>
            <Link href="#menu_container">Most Popular</Link>
          </div>
          <div className={styles.social}>
            <h3>Social</h3>
            <Link href="/">Facebook</Link>
            <Link href="/">Twitter</Link>
            <Link href="/">Linkdin</Link>
            <Link href="/">Instagram</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
