"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import  { useRouter } from "next/navigation"
import styles from "./login.module.css";
import { Imprima } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
import Error from "next/error";
import * as Yup from 'yup'
export default function Signup() {

  const [formData, setFromData] = useState({});
  const { data, status } = useSession();
  const [error, setError]= useState({})
  const router = useRouter()
  function handleChange(e) {
    let { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  }

  const validationSchema = Yup.object({
    username : Yup.string().required('Username is required').max(40),
    email : Yup.string().required('Email is required').email('Invalid Email format'),
    password : Yup.string().required('Password is required')
        .matches(/^(?=.*[!@#$%^&*()-_=+{}\[\]|;:'",.<>?]).{8,}$/,'At least one symbol required')
        .matches(/[0-9]/,'At least one number is required')
        .matches(/[A-Z]/, 'At least one uppercase charcter required')
        .matches(/[a-z]/,'At least one lowercase character required')
    })
  // console.log(data,status)
  async function handleLogin(e) {
  
    e.preventDefault();

    
      try {
        const valid = await validationSchema.validate(formData,{abortEarly : false})
        if(valid) {
          const response = await fetch("https://next-blog-sand-ten-63.vercel.app/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            let result = await response.json();
            setUserStatus('login')
          }
        }
        
      } catch (err) {

        const error = {}
        err.inner.forEach(e => {
          error[e.path] =  e.message
        });
        setError(error)
      }
    } 
  
  
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_container}>
        <div className="text text-center text-2xl font-bold">REGISTER</div>
        <form 
        onSubmit={(e) => handleLogin(e)}
          action=""
          className="flex flex-col"
        >
          
            
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => handleChange(e)}
                className="rounded-full"
                type="text"
                name="username"
                id="username"
                placeholder="Enter you name"
                required
              />
            {error.username && <div className="text-red-700">{error.username}</div> }
          
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            className="rounded-full"
            type="email"
            name="email"
            id="email"
            placeholder="Enter you email"
            required
          />
           {error.email && <div className="text-red-700">{error.email}</div> }
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleChange(e)}
            className="rounded-full"
            type="password"
            name="password"
            id="password"
            placeholder="Enter you name"
            required
          />
           {error.password && <div className="text-red-700">{error.password}</div> }

          <button type="submit" className="rounded-full" onClick={(e)=> handleLogin(e)}>
            Signup
          </button>

          <div className={styles.links}>
            click here to{" "} 
            <span>
            <Link className="text-blue-700 cursor-pointer" href={'/form/login'} >Login</Link>
              
            </span>
          </div>
        </form>

        <p className="text-center">OR</p>
        <div className={`${styles.authLinks} cursor-pointer`}>
          <div className={`${styles.google} rounded-full `}onClick={() =>{ signIn("google") 
        
        }}>
            {" "}
            <div className={styles.google_box}>
              <Image
                alt="no image"
                src={"/google.png"}
                height={40}
                width={40}
              ></Image>{" "}
              Sign in with Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
      }
