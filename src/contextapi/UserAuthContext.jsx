'use client'
import { useSession } from "next-auth/react";
import { createContext } from "react";

export const UserAuthContext = createContext()
export function UserAuthProvider({children}) {
    const {data: session, status} = useSession()
    return(
        <UserAuthContext.Provider value={{session,status}}>
            {children}
        </UserAuthContext.Provider>
    )
}