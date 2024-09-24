"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

 export const BookmarkContext = createContext();
export function BookmarksProvider({ children }) {
    const { data: session,status } = useSession();
    const [bookmarks, setBookmarks] = useState([])
  const getBookmarks = async () => {
    try {
    if (!session)  throw new Error("not Authenticated");
    const res = await fetch("http://localhost:3000/api/bookmarks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const out = await res.json()
    setBookmarks(out.result)
  } catch (error) {
   throw error
  }}
  useEffect(() => {
if(status =='authenticated' && session){
    getBookmarks()
    
}
  },[session,status])
  return <BookmarkContext.Provider value={{ bookmarks,setBookmarks }}>{children}</BookmarkContext.Provider>;
}
