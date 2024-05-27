"use client";
import { useState } from "react";
import Image from "next/image";
import  { useRouter } from "next/navigation"
import styles from "./login.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Yup from 'yup'
export default function Login() {

  const [formData, setFromData] = useState({});
  const { data, status } = useSession();
  const [error, setError] = useState({})
  const [credentialError, setCredentialError] = useState(false)
const router = useRouter()
  const validationSchema = Yup.object({
    email : Yup.string().required('Email is required to Login').email('Invalid Email format'),
    password : Yup.string().required('Password is required to Login')
        
    })
  function handleChange(e) {
    let { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
        const valid = await validationSchema.validate(formData,{abortEarly:false})
        if (valid) {
          const signinData  =  await signIn('credentials', {
            email : formData.email,
            password : formData.password,
            redirect : false
            
        })
        if(signinData.error){
          setCredentialError(true)
          }
        else {
          router.push('/dashboard')
        }
        }
    }
    catch (err) {
      console.log(err)
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
      <div className="text text-center text-2xl font-bold">LOGIN</div>
        <form
          onSubmit={(e) => onSubmit(e)}
          action=""
          className="flex flex-col"
        >
          
            
    
          
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

       {credentialError &&  <div className="credentialerror bg-red-700/50 rounded-xl mt-8 h-12 font-bold text-center text-lg">Invalid credentials</div> }
          <button type="submit"
          className="rounded-full"
          >
         Login
          </button>

          <div className={styles.links}>
            click here to{" "}
            <span>
               
            <Link className="text-blue-700 cursor-pointer" href={'/form/signup'} >Signup</Link>
              
          
            </span>
          </div>
        </form>

        <p className="text-center">OR</p>
        <div className={`${styles.authLinks} cursor-pointer`}>
          <div className={`${styles.google} rounded-full`} onClick={() =>{ signIn("google") 
        
        }}>
            {" "}
            <div className={styles.google_box}>
              <Image
                alt="no image"
                src={"/google.png"}
                height={40}
                width={40}
              ></Image>
              Sign in with Google
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
