'use client'

import { useState } from "react"
import styles from './search.module.css'
import { useRouter } from "next/navigation"
import Category from "../category/category"


export default function Search() {
    const  [searchbar, setSearchbar] = useState('')
    const router = useRouter()
    const handleChange= (e) => {

        setSearchbar(e.target.value)
    }
     const handleSearch = () => {
        router.push(`/search?postslug=${searchbar}`)
     }
  
    return (
        <div className={`${styles.search_container} pt-20 pb-6 bg-bgBlack `}>
            <div className="search_wrapper md:w-3/5 w-5/6 mx-auto overflow-hidden rounded-full bg-hoverBg ">

             <input onChange={handleChange} type="text" id="search" className="w-2/3" name="search" placeholder="Search for article"/>
            <button onClick={handleSearch} className="bg-blue-500 w-1/3  hover:bg-blue-400" >Search</button>
            </div>
            <Category></Category> 
        </div>
    )
}