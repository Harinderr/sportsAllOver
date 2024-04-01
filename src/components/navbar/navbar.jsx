'use client'
import Link from "next/link"
import styles from "@/components/navbar/navbar.module.css"
import { signOut, useSession } from "next-auth/react"
import Theme from "../Theme/theme"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
   const [open ,setOpen] = useState(false)
   const {data, status} = useSession()
    console.log(data,status);
   const router = useRouter()
   function handleNav() {
    setOpen(open == false ? true : false)
   }

   
   useEffect(()=> {
if(status == 'authenticated'){
    router.push('/dashboard')
}
   },[status])

    return (
        <>
         <div className={`${styles.container} flex h-16   flex-row justify-between align-middle`}>
            <div className={styles.name}>BLOGPOST</div>
            <div className={styles.nav_links}>
                <Link className={styles.nav_link}  href={'/'}>Home</Link>
                <Link  className={styles.nav_link} href={'#latest'}>Latest</Link>
                <Link  className={styles.nav_link} href={'/'}>About</Link>
                {
                    (status === 'authenticated') ? (
                        <div className={styles.nav_link}>
                        <div style={{cursor:'pointer'}} onClick={()=> signOut()}>Logout</div>
                        <Link href={'/write'}>Write</Link>
                        </div>
                    ) : (
                        <Link className={styles.nav_link}  href={'/form/login'}>Login</Link>
                    )
                }
                <Theme className={styles.nav_link}></Theme>
            </div>
        <div className={styles.hamburger} onClick={handleNav}>
            <div className={styles.top}></div>
            <div className={styles.middle}></div>
            <div className={styles.bottom}></div>
        </div>
   

        </div>
        {open && (
           <div className={styles.responsive_links}>
           <Link className={styles.responsive_link}  href={'/'}>Home</Link>
           <Link  className={styles.responsive_link} href={'/'}>Contact</Link>
           <Link  className={styles.responsive_link} href={'/'}>About</Link>
           <Link className={styles.responsive_link}  href={'/'}>Login</Link>
           
       </div>
      )}
        </>
       
       
    )
}