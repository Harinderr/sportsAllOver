"use client";
import { useState } from "react";
import Image from "next/image";
import  { useRouter } from "next/navigation"
import styles from "./login.module.css";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import * as Yup from 'yup'
import { Loader, Loader2 } from "lucide-react";
export default function Login() {

  const [formData, setFromData] = useState({});
  const { data, status } = useSession();
  const [error, setError] = useState({})
  const [loading, setLoading]  = useState(false)
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
    setLoading(true)
    try{
        const valid = await validationSchema.validate(formData,{abortEarly:false})
        if (valid) {
          const signinData  =  await signIn('credentials', {
            email : formData.email,
            password : formData.password,
            redirect : false
            
        })
        if(signinData.error){
          setLoading(false)
          setCredentialError(true)
          }
        else {
          setLoading(false)
          router.push('/dashboard')
        }
        }
    }
    catch (err) {
      console.log(err)
      setLoading(false)
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
      <div className="text-center text-3xl md:text-4xl font-bold text-white">LOGIN</div>
      
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col gap-2 xs:p-8  "
      >
        <div className="flex flex-col space-y-1">
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
        <div  className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-lg font-semibold">Password</label>
        <input
          onChange={(e) => handleChange(e)}
          className="rounded-full p-3 border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          required
        />
        </div>
        {error.password && <div className="text-red-700">{error.password}</div>}
  
        {credentialError && (
          <div className="bg-red-700/50 rounded-xl mt-4 h-12  text-center text-white text-lg font-light flex items-center justify-center">
            Invalid credentials
          </div>
        )}
  
        <button
          type="submit"
          disabled={loading}
          className=" rounded-full flex flex-row justify-center gap-2 items-center bg-blue-700 text-white py-3  hover:bg-blue-600 "
        >
         <span>Login</span>  { loading && <div class="loader"></div>}
        </button>
        
        <div className={`${styles.links} text-center mt-4`}>
          Click here to{' '}
          <span>
            <Link className="text-blue-700 cursor-pointer font-semibold" href={'/form/signup'}>
              Signup
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
          <span className="font-semibold text-white text-sm xs:text-base ">Sign in with Google</span>
        </div>
      </div>
    </div>
  </div>
  
  );
}
