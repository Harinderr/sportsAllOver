'use client'
import { useRouter } from 'next/navigation'
import styles from './category.module.css'
import { useEffect, useState } from 'react'
 async function getData() {
    const response = await fetch('/api/categories')
    if(!response.ok) {
        throw 'three is an erro'
    }
    let { result } = await response.json()
    return result;
}
export default  function Category() {

    const router = useRouter()
    const [data, setData] = useState([])
   
   
    useEffect( ()=> {
       async function fetchdata() {
        const value  = await getData()
       
        setData(value)
        
       } 
       fetchdata()
    },[])

    return (
        <div className={`${styles.container} mx-auto w-2/3 mt-8  flex justify-around flex-wrap  flex-row gap-2 bg-bgBlack`}>
        {
            data.map(item => {
                return <div className='bg-inputBg text-center text-xs w-24 sm:text-sm cursor-pointer capitalize hover:bg-gray-700  px-3 py-2 rounded-lg ' key={item.id}  onClick={()=> router.push(`/blog?page=${1}&cat=${item.slug}`)}>{item.slug}</div>
            })
        }
       
        </div>
    )
}