'use client'

import { useState } from "react"
import styles from './search.module.css'
import { useRouter } from "next/navigation"
import Category from "../category/category"
import { SearchIcon } from "lucide-react"



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
        <div className={` pt-20 pb-6 bg-bgBlack `}>
            <div className="search_wrapper md:w-3/5 w-5/6 flex flex-row mx-auto overflow-hidden rounded-full bg-hoverBg ">

             <input onChange={handleChange} type="text" id="search" className=" bg-inputBg focus:bg-gray-700 w-3/4 px-4" name="search" placeholder="Search for article "/>
            <button onClick={handleSearch} className="bg-blue-500 w-1/4 text-lg px-4 py-4 hover:bg-blue-400" > <SearchIcon  className="mx-auto"/> </button>
            </div>
            <Category></Category> 
        </div>
    )
}