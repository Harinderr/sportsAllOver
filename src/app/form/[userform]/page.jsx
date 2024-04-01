'use client'
import Signup from "@/components/signupform/signup"
import Login from "@/components/loginform/login"
import { useState } from "react"

export default function UserAuth({params}) {
    const { userform } = params

    
    const [status, setStatus] = useState(userform)
    
    return (
<>
{status === 'signup' && <Signup></Signup>}
{status === 'login' && <Login></Login>}

</>
       
    )
}