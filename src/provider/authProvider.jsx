'use client'
import { SessionProvider } from "next-auth/react"
import { useEffect } from "react"
export const AuthProvider = ({children}) => {
 return (
        <SessionProvider>
                {children}
            </SessionProvider>
    )
}