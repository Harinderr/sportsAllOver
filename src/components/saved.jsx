'use client';
import { BookmarkContext } from '@/contextapi/bookmarksProvider';
import { checkBookmark } from '@/lib/utils';
import { Bookmark } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegBookmark } from 'react-icons/fa'; // Make sure this is imported
import { BookmarkIcon } from '@heroicons/react/24/outline'; // Outline version for unbookmarked
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'; 
import { useRouter } from 'next/navigation';

const Saved = () => {
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const { data: session } = useSession();
  const router = useRouter()
  const [result, setResult] = useState([]);
  const email = session?.user?.email;

  async function FetchSavedPosts() {
    try {
      let res = await fetch('http://localhost:3000/api/bookmarks/saved', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
      let output = await res.json();
       
      setResult(output.result || []);
    } catch (error) {
      console.log('Cannot fetch the saved posts');
    }
  }

  const handleBookmark = async (val) => {
    try {
      const isBookmarked = bookmarks.some((i) => i.postId === val);

      // Toggle based on the current bookmark state
      if (isBookmarked) {
        // If currently bookmarked, delete the bookmark
        let res = await fetch('http://localhost:3000/api/bookmarks', {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ val, email }),
        });

        if (res.ok) {
          // Filter out the deleted bookmark from the bookmarks context
          setBookmarks((prev) => prev.filter((i) => i.postId !== val));
        }
      } else {
        // If not bookmarked, add the bookmark
        let res = await fetch(`http://localhost:3000/api/bookmarks`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ val, email }),
        });

        if (res.ok) {
          const o = await res.json();
          setBookmarks((prev) => [...prev, o.result]);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchSavedPosts();
  }, [bookmarks]);

  return (
    <div className="w-full h-full bg-inputBg py-8 lg:px-12 px-3">
  <h1 className="text-3xl font-bold">Saved Blogs</h1>

  {result?.map((i) => {
    const isBookmarked = checkBookmark(bookmarks, i.id); // Check bookmark state for each post

    return (
      <div key={i.id} className="box flex flex-col md:flex-row  mt-6 bg-hoverBg w-full md:w-5/6 mx-auto h-auto md:h-48 relative">
        <div className="absolute top-2 right-2 z-10">
          {isBookmarked ? (
            <BookmarkSolidIcon className="text-blue-500 h-6 w-6 cursor-pointer" onClick={() => handleBookmark(i.id)} />
          ) : (
            <BookmarkIcon className="h-6 w-6 cursor-pointer" onClick={() => handleBookmark(i.id)} />
          )}
        </div>

        <div className="imgWrapper overflow-hidden md:m-5 w-full md:w-1/3 relative h-48 md:h-auto">
          <Image alt="no image" src={i.img} fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="w-full md:w-2/3 p-4 overflow-hidden md:px-4 md:pt-6">
          <div onClick={() => router.push(`/posts/singlepost?slug=${i.slug}`)} className="md:text-2xl cursor-pointer hover:text-blue-800 text-xl font-bold headers">{i.title.substring(0, 40)}</div>
          <div className="des md:text-md text-sm font-normal">{i.subDes.substring(0, 80)}</div>
        </div>
      </div>
    );
  })}

  {result.length === 0 && (
    <div className="text-3xl text-center mt-10">No Bookmarks yet</div>
  )}
</div>
  )
};

export default Saved;
