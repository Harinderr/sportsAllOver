'use client'
import Link from "next/link"
import styles from "@/components/navbar/navbar.module.css"
import { signOut, useSession } from "next-auth/react"
import Theme from "../Theme/theme"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"


export default function Navbar() {
   const [open ,setOpen] = useState(false)
   const [isOpen, setIsopen] = useState(false)
   const {data, status} = useSession()
 
   const router = useRouter()
   function handleNav() {
    setOpen(open == false ? true : false)
   }
  

   const handleProfile = () => {
        setIsopen(!isOpen)
   }
   const firstLetter = data?.user.username.slice(0,1).toUpperCase() || data?.user.name.slice(0,1).toUpperCase()
   

   useEffect(()=> {
if(status == 'authenticated'){
    router.push('/dashboard')
}
else {
    router.push('/')
}
   },[])


    return (
        <>
         <div className={`${styles.container} flex h-16   flex-row justify-between align-middle`}>
            <div className={styles.name}>BLOGPOST</div>
          {/* { windowWidth <= 500 && <Theme className={styles.nav_link}></Theme>  }   */}
            <div className={styles.nav_links}>
                <Link className={styles.nav_link}  href={'/'}>Home</Link>
                <Link  className={styles.nav_link} href={'#latest'}>Latest</Link>
                <Link  className={styles.nav_link} href={'/'}>About</Link>
                
              
                <Theme className={styles.nav_link}></Theme>
                {
                    (status === 'authenticated') ? (
                        // <div className={styles.nav_link}>
                        // <div style={{cursor:'pointer'}} onClick={()=> signOut()}>Logout</div>
                        // <Link href={'/write'}>Write</Link>
                        // </div>
                <>       <div onClick={handleProfile} className="profile relative pl-4 h-8 flex flex-row ">
            <div className="profile_container w-10">
            <div className="box w-8 h-8  bg-red-300 cursor-pointer text-black flex justify-center align-middle rounded-full text-xl font-bold "><p className="drop-shadow-md">{firstLetter}</p></div>
            <h2 className="text-center mt-2 font-bold">{}</h2></div>   
            {isOpen && (
          <div className={`${styles.popup} popup-menu absolute top-10  px-6 py-3 bg-slate-400`}>
            <ul>
              <li><Link href="/dashboard"className="text-lg" >Dashboard</Link></li>
              <li onClick={()=> signOut()} ><a href="#"className="text-lg" >Logout</a></li>
            </ul>
          </div>
        )}
            </div>
           
            </> 
            
                    ) : (
                        <Link className={styles.nav_link}  href={'/form/login'}>Login</Link>
                    )
                }
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
           <Link  className={styles.responsive_link} href={'#latest'}>Latest</Link>
           <Link  className={styles.responsive_link} href={'/'}>About</Link>
           <Link className={styles.responsive_link}  href={'/'}>
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
           </Link>
           
       </div>
      )}
        </>
       
       
    )
}