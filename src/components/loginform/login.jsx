"use client";
import { useState } from "react";
import Image from "next/image";
import  { useRouter } from "next/navigation"
import styles from "./login.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Login() {

  const [formData, setFromData] = useState({});
  const { data, status } = useSession();
  
  const router = useRouter()
  function handleChange(e) {
    let { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const signinData  =  await signIn('credentials', {
      email : formData.email,
      password : formData.password,
      redirect : false
  })
  
  if(signinData.error){
    console.log('this is error ' + signinData.error)
  }
  else {
    router.push('/dashboard')
  }
  }
 
  
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_container}>
        <form
          onSubmit={(e) => onSubmit(e)}
          action=""
          className="flex flex-col"
        >
          
            
    
          
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleChange(e)}
            type="email"
            name="email"
            id="email"
            placeholder="Enter you email"
          />
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => handleChange(e)}
            type="password"
            name="password"
            id="password"
            placeholder="Enter you name"
          />

          <button type="submit">
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
          <div className={styles.google} onClick={() =>{ signIn("google") 
        
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
