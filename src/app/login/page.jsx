'use client'
import { useState } from "react"
import Image from "next/image"
import styles from "./login.module.css"
import { Imprima } from "next/font/google"
import { signIn, signOut, useSession } from "next-auth/react"
export default function Login() {
    const [userStatus, setUserStatus] = useState('register')
    const [formData , setFromData] = useState({})
    const {data, status} = useSession()
    function handleChange(e) {
        let {name, value} = e.target;
       setFromData({...formData, [name]:value})
       
    }
    console.log(data,status)
  async   function handleLogin() {
         try {
            const response = await fetch('http://localhost:3000/api/login', {
                method : 'POST',
                headers: {
                    "Content-Type": "application/json",
                  },
                body : JSON.stringify(formData)
            })
            if(response.ok){
                let result = await response.json()
                console.log(result)
            }
         }  
         catch(err) {
            console.log('There is an error' + err)
         } 
    }
    return (
        <div className={styles.login_wrapper}>
        <div className={styles.login_container}>
            <form onSubmit={handleLogin} action="" className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input onChange={(e)=> handleChange(e) } type="text" name="username" id="username" placeholder="Enter you name"/>
            <label htmlFor="username">Password</label>
            <input onChange={(e)=> handleChange(e)}  type="password" name="password" id="password" placeholder="Enter you name"/>
           
            <button type="submit">{userStatus == 'register'? 'Register' : "Login"}</button>
           
            <div className={styles.links}>
                click here to <span className="text-blue-700 cursor-pointer" onClick={() => setUserStatus(userStatus == "register" ? "login" : "register")}>{userStatus == 'register'? 'Login' : "Register"}</span>
            </div>
            </form>

            <p className="text-center">OR</p>
            <div className={`${styles.authLinks} cursor-pointer`}>
                <div className={styles.google} onClick={()=> signIn('google')}> <div className={styles.google_box}><Image alt="no image" src={'/google.png'} height={40} width={40}></Image> Sign in with Google
                </div>
                </div>
               
            </div>
           
            </div>
        </div>
    )
}