import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, X } from "lucide-react"
import { styles } from "./navbar.module.css"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function Hamburger({status}) {
  return (
    <Sheet>
      <SheetTrigger className="sm:hidden block">
        <Menu size={32} strokeWidth={2.5} />
      </SheetTrigger>
      <SheetContent className="bg-bgBlack">
        <SheetHeader>
          <div className="flex flex-col my-4 ">
            <SheetClose asChild>
              <Link scroll={true} className="text-white font-semibold p-3 hover:bg-hoverBg" href={'/'}>Home</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link scroll={true} className="text-white font-semibold p-3 hover:bg-hoverBg" href={'#latest'}>Latest</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link scroll={true} className="text-white font-semibold p-3 hover:bg-hoverBg" href={'/'}>About</Link>
            </SheetClose>

            {status === 'authenticated' ? (
              <>
                <SheetClose asChild>
                  <div className="text-white font-semibold p-3 hover:bg-hoverBg" style={{cursor:'pointer'}} onClick={()=> signOut()}>Logout</div>
                </SheetClose>
                <SheetClose asChild>
                  <Link href={'/write'} className="text-white font-semibold p-3 hover:bg-hoverBg">Write</Link>
                </SheetClose>
              </>
            ) : (
              <SheetClose asChild>
                <Link className="text-white font-semibold p-3 hover:bg-hoverBg" href={'/form/login'}>Login</Link>
              </SheetClose>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}
