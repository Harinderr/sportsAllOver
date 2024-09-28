'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Profile from './profile';
import Saved from './saved';
import { useContext } from 'react';
import { UserAuthContext } from '@/contextapi/UserAuthContext';
import AllBlogs from './AllBlogs';


export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname()
  const {session} = useContext(UserAuthContext)
  const isActive = (path) => pathname === path || pathname == `${path}/`;

  return (
    <div className=" bg-hoverBg min-h-screen  text-white flex  flex-col shadow-lg">
     <Tabs defaultValue="profile" className="md:w-2/3 xs:w-4/5 w-full  my-10 mx-auto">
  <TabsList>
    <TabsTrigger value="profile">
     Profile
    </TabsTrigger>
    <TabsTrigger value="saved" >
      Saved
    </TabsTrigger>
  { session?.user?.role === 'admin'  && (<TabsTrigger value="all" >
      Manage Blogs
    </TabsTrigger>)}
  </TabsList>
  <TabsContent value="profile"><Profile/></TabsContent>
  <TabsContent value="saved"> <Saved/></TabsContent>
  <TabsContent value="all"> <AllBlogs/></TabsContent>
</Tabs>
    </div>
  );
}
