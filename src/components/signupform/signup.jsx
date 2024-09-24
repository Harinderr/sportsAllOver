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
          const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          if (response.ok) {
            let result = await response.json();
            router.push('/form/login')
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
    <div className={`${styles.login_wrapper} flex items-center justify-center min-h-screen p-4`}>
  <div className={`${styles.login_container} bg-white shadow-lg rounded-xl p-6 md:p-12 max-w-lg w-full`}>
    <div className="text-center text-3xl md:text-4xl font-bold text-white mb-6">REGISTER</div>
    
    <form 
      onSubmit={(e) => handleLogin(e)}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col space-y-1">

   
      <label htmlFor="username" className="text-lg font-semibold">Username</label>
      <input
        onChange={(e) => handleChange(e)}
        className="rounded-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        name="username"
        id="username"
        placeholder="Enter your name"
        required
      />
         </div>
      {error.username && <div className="text-red-700">{error.username}</div>}
<div className="flex flex-col  space-y-1">
      <label htmlFor="email" className="text-lg font-semibold">Email</label>
      <input
        onChange={(e) => handleChange(e)}
        className="rounded-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="email"
        name="email"
        id="email"
        placeholder="Enter your email"
        required
      />
      </div>
      {error.email && <div className="text-red-700">{error.email}</div>}
      <div className="flex flex-col  space-y-1">
      <label htmlFor="password" className="text-lg font-semibold">Password</label>
      <input
        onChange={(e) => handleChange(e)}
        className="rounded-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
        required
      />
      </div>
      {error.password && <div className="text-red-700">{error.password}</div>}

      <button 
        type="submit" 
        className="rounded-full bg-blue-700 text-white py-3 mt-4 hover:bg-blue-600 transition-all duration-300"
        onClick={(e) => handleLogin(e)}
      >
        Signup
      </button>

      <div className={`${styles.links} text-center mt-4`}>
        Click here to{" "}
        <span>
          <Link className="text-blue-700 cursor-pointer font-semibold" href={'/form/login'}>
            Login
          </Link>
        </span>
      </div>
    </form>

    <p className="text-center text-gray-600 mt-6">OR</p>

    <div className={`${styles.authLinks} flex justify-center mt-4`}>
      <div 
        className={`${styles.google} bg-gray-100 hover:bg-gray-200 transition-all duration-300 cursor-pointer rounded-full py-3 px-6 flex items-center space-x-3`} 
        onClick={() => { signIn("google") }}
      >
        <Image
          alt="Google"
          src="/google.png"
          height={30}
          width={30}
        />
        <span className="font-semibold text-sm xs:text-base text-white">Sign in with Google</span>
      </div>
    </div>
  </div>
</div>

  );
      }
