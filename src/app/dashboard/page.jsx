
import {  authoption, getAuthSession } from "@/utility/auth";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import styles from "./dashboard.module.css"
import Logout from "@/components/logoutButton/logout";

 export default async function Dashboard() {
   const session = await getServerSession(authoption)
   console.log(session)
  const name = session?.user.username || session?.user.name
  const img = session?.user.image
  const firstLetter = session?.user.username.slice(0,1).toUpperCase() || session?.user.name.slice(0,1).toUpperCase()
 console.log(firstLetter)
  return (
        <div className={`${styles.container}   h-auto`}>
           <div className="wrapper w-2/3 mx-auto  pt-10">
           <h1 >Welcome to the Dashboard {name}</h1> 
        <div className="profile flex flex-col gap-4 ">
          { img ? <Image src={img} alt="image unavailable"></Image> : <div className="profile_container w-28">
            <div className="box w-28 h-28  bg-red-300 text-black flex justify-center align-middle rounded-full text-8xl font-bold "><p className="drop-shadow-md">{firstLetter}</p></div>
            <h2 className="text-center mt-2 font-bold">{name}</h2></div>   }  
            
            </div>
         <Logout></Logout>
   
        </div>
        </div>
    )
} 
