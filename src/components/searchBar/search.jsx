'use client'

import { useState } from "react"
import styles from './search.module.css'
import { useRouter } from "next/navigation"

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
        <div className={`${styles.search_container} py-20`}>
            <div className="search_wrapper w-3/5 mx-auto overflow-hidden rounded-full ">

             <input onChange={handleChange} type="text" id="search" name="search" placeholder="Search for article"/>
            <button onClick={handleSearch}>Search</button>
            </div>
          
        </div>
    )
}