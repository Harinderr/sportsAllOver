'use client'
import { useRouter } from 'next/navigation'
import styles from './category.module.css'
import { useEffect, useState } from 'react'
 async function getData() {
    const response = await fetch(' https://next-blog-sand-ten-63.vercel.ap/api/categories')
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
        <div className={styles.container}>
        {
            data.map(item => {
                return <div key={item.id}  onClick={()=> router.push(`/blog?page=${1}&cat=${item.slug}`)}>{item.slug}</div>
            })
        }
       
        </div>
    )
}