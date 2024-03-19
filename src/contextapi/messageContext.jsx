'use client'
import { createContext, useState } from "react";

export const messageContext = createContext()

export function messageContextProvider({children}) {
const [id , setId] = useState('')

     return (
        <messageContext.Provider value={{id , setId}}>
  {children}
            </messageContext.Provider>
     )
}
