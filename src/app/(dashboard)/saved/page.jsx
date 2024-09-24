'use client';
import { BookmarkContext } from '@/contextapi/bookmarksProvider';
import { checkBookmark } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegBookmark } from 'react-icons/fa'; // Make sure this is imported

const Saved = () => {
  const { bookmarks, setBookmarks } = useContext(BookmarkContext);
  const { data: session } = useSession();
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
      setResult(output.result);
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
    <div className="w-full h-full bg-hoverBg py-8 px-12 overflow-y-scroll">
      <h1 className="text-3xl font-bold">Saved Blogs</h1>

      {result.map((i) => {
       // Check bookmark state for each post

        return (
          <div key={i.id} className="box flex mt-6 flex-row bg-inputBg w-5/6 mx-auto h-48 relative p-4">
            <FaRegBookmark
              onClick={() => handleBookmark(i.id)}
              className={`hover:scale-150 absolute top-2 right-2 cursor-pointer ${checkBookmark(bookmarks, i.id) && 'text-blue-500'}`} // Optimistic UI change
            />
            <div className="imgWrapper w-1/3 relative">
              <Image alt="no image" src={i.img} fill style={{ objectFit: 'contain' }} />
            </div>
            <div className="w-2/3 p-4">
              <div className="text-2xl font-bold headers">{i.title.substring(0, 40)}</div>
              <div className="des text-lg font-semibold">{i.des.substring(0, 80)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Saved;
