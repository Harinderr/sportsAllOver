'use client'
import { ThemeContext } from "@/contextapi/ThemeContext"
import Image from "next/image"
import { useContext } from "react"
import styles from '@/components/Theme/theme.module.css'
export default function Theme() {

   const {theme, toggle} =  useContext(ThemeContext)
  
    return (
        <div onClick={toggle} className={`${styles.container} relative bg-slate-500   w-8 flex flex-row justify-between align-middle rounded-lg`}>
        <Image src={'/moon.png'} alt="Image unavailable" width={18} height={18}></Image>
        <div className={`${styles.circle} rounded-full h-4 w-4 absolute  ${ theme === 'light'? 'left-0': 'right-0'}`}></div>
        <Image src={'/sun.png'} alt="Image unavailable" width={18} height={18}></Image>
        </div>
    )
}