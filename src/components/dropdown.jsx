"use client"
 
import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "next-auth/react"
 
export function DropdownMenuRadioGroupDemo({children}) {
  const [position, setPosition] = React.useState("bottom")
 
  return (
    <DropdownMenu className="" >
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-hoverBg flex flex-col border-none">
      
        <DropdownMenuSeparator  />
        
       
            <Link href={'/dashboard'} className="text-white px-4 py-2 hover:bg-slate-700"> <LayoutDashboard color="white" /> Dashboard</Link>
         
          
          <div onClick={()=> signOut()} className="text-white px-4 py-2 hover:bg-gray-700"> <LogOut color="white" /> Logout</div>
         
         
       
      </DropdownMenuContent>
    </DropdownMenu>
  )
}