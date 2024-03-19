'use client'

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext()
function getLocalStorage() {
    if(typeof window != 'undefined' && window.localStorage){

        const value =  localStorage.getItem('theme') 
        return  value || 'light'
    }
    
    }
   

export function  ThemeContextProvider({children}) {
    const [theme, setTheme] = useState(() => getLocalStorage());
  useEffect(()=> {
    
        localStorage.setItem('theme', theme)
     
  },[theme])

    const toggle = () =>  {
        setTheme(theme== 'light' ? 'dark' : 'light')
    }
   
    return (
        <ThemeContext.Provider value={{theme, toggle}}>
        {children}
        </ThemeContext.Provider>
    )
}