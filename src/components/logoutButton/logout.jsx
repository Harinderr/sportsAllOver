'use client'
import { useRouter } from "next/navigation"
import { func } from "joi"
import { signOut } from "next-auth/react"

export default function Logout() {
    const router  = useRouter()
    const handleLogout = () => {
        signOut()
        router.push('/')

    }
    return (
        <button className="bg-red-500 w-40 mt-4 text-white drop-shadow-md p-4 font-bold" onClick={handleLogout} >Logout</button>
    )
}