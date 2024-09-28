'use client'
import { useState } from "react"
import styles from "./textEditor.module.css"
export default function TextEditor() {
    const [blogData, setBlogData] = useState({

    })
    function handleChange(e) {
        const {name, value} = e.target;
       setBlogData({...blogData, [name] : value})

    }

    async function handleSubmit() {
        try{
            const response  = await fetch('https://next-blog-sand-ten-63.vercel.app/api/blogdata',{
                method : "POST",
                body : JSON.stringify(blogData)
            })
            if(response.ok) {
                let result = await response.json()
                console.log(result)
                alert('blog published')
                
            }

        } catch(err) {
                console.log('There is an error')
        }
    }
    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={`${styles.form} flex flex-col gap-2 w-2/3 mx-auto`} action="">
                <label htmlFor="title">Title</label>
                <input  onChange={(e)=> handleChange(e)} type="text" name="title" id="title" placeholder="Enter your title" />
                <label htmlFor="content">Body</label>
            <textarea onChange={(e)=> handleChange(e)} name="content" id="" cols="30" rows="10" placeholder="Enter contnet"></textarea>
            <button type="submit">Publish</button>
            </form>
           
        </div>
    )
}