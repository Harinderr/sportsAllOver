'use client'
import Image from "next/image"
import Link from "next/link"
import styles from "@/components/post/post.module.css"
import { FaRegBookmark } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { checkBookmark } from "@/lib/utils";
import { BookmarkContext } from "@/contextapi/bookmarksProvider";
import { BookmarkIcon } from '@heroicons/react/24/outline'; // Outline version for unbookmarked
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'; 

export default function Post(
  {src,title,subDes,date,id,slug,catSlug}
) {
  const {bookmarks, setBookmarks} = useContext(BookmarkContext)
  const [bookmark, setBookmark] = useState(false)
  const {data, status} = useSession()
  const email = data?.user.email

  useEffect(() => {
    // Check if the post is already bookmarked when the component mounts
    setBookmark(checkBookmark(bookmarks, id))
  }, [bookmarks, id])

  const handleBookMark = async (val) => {
    // Optimistic UI update
    setBookmark((prev) => !prev)

    try {
      const isBookmarked = bookmarks.some((i) => i.postId === val)
      
      // Toggle based on current bookmark state
      if (bookmark && isBookmarked) {
        // If currently bookmarked, delete the bookmark
        let res = await fetch('http://localhost:3000/api/bookmarks', {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({val, email})
        })

        if (res.ok) {
          // Filter out the deleted bookmark from the bookmarks context
          setBookmarks((prev) => prev.filter((i) => i.postId !== val))
        } else {
          // If the request fails, revert bookmark state
          setBookmark(true)
        }
      } else {
        // If not bookmarked, add the bookmark
        let res = await fetch(`http://localhost:3000/api/bookmarks`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({val, email})
        })

        if (res.ok) {
          const o = await res.json()
          setBookmarks((prev) => [...prev, o.result])
        } else {
          // If the request fails, revert bookmark state
          setBookmark(false)
        }
      }
    } catch (error) {
      console.error(error)
      // Revert bookmark state in case of an error
      setBookmark((prev) => !prev)
    }
  }

  const titletextLimit = title && title.substring(0, 50) + '...'
  const contentTextLimit = subDes && subDes.substring(0, 80) + '...'

  return (
    <div className="postContainer sm:h-72 w-56 h-44 relative group rounded-md">
      <div className="z-10 text-xs rounded-full flex flex-row justify-between items-center gap-2 p-1 absolute right-1 top-1">
        <span className="border-2 px-1 capitalize border-blue-500 rounded-full">
          {catSlug}
        </span>
        {bookmark ? (
    <BookmarkSolidIcon className="text-blue-500  h-6 w-6 cursor-pointer" onClick={() => handleBookMark(id)} />
  ) : (
    <BookmarkIcon className="h-6 w-6 cursor-pointer" onClick={() => handleBookMark(id)} />
  )}
      </div>
      <Image className="z-1" src={src} layout="fill" objectFit="cover" alt="no-image"></Image>
      <div className="z-10 text-gray-200 absolute w-full h-auto bottom-0 left-0 bg-gradient-to-t from-bgBlack via-gray-900/90 to-transparent">
        <div className="boxWrapper w-full max-h-full p-4 overflow-hidden">
          <Link className="text-wrap h-auto font-semibold text-base md:text-xl hover:underline" href={`/posts/singlepost?slug=${slug}`}>
            {titletextLimit}
          </Link>
          <p className="  text-xs sm:text-sm  text-white opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 translate-all duration-1000">
            {contentTextLimit}
          </p>
        </div>
      </div>
    </div>
  )
}
