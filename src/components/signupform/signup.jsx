"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import  { useRouter } from "next/navigation"
import styles from "./login.module.css";
import { Imprima } from "next/font/google";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Signup() {

  const [formData, setFromData] = useState({});
  const { data, status } = useSession();
  const router = useRouter()
  function handleChange(e) {
    let { name, value } = e.target;
    setFromData({ ...formData, [name]: value });
  }
  // console.log(data,status)
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/signup", {
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
    } catch (err) {
      console.log("There is an error" + err);
    }
  }
  return (
    <div className={styles.login_wrapper}>
      <div className={styles.login_container}>
        <form
          onSubmit={(e) => handleLogin(e)}
          action=""
          className="flex flex-col"
        >
          
            
              <label htmlFor="username">Username</label>
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                name="username"
                id="username"
                placeholder="Enter you name"
              />
            
          
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

          <button type="submit" onClick={(e)=> handleLogin(e)}>
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
