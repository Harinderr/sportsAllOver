'use client';
import { BookmarkContext } from '@/contextapi/bookmarksProvider';
import { checkBookmark } from '@/lib/utils';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaRegBookmark } from 'react-icons/fa'; // Make sure this is imported
import { BookmarkIcon } from '@heroicons/react/24/outline'; // Outline version for unbookmarked
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid'; 
import { useRouter } from 'next/navigation';
import { UserAuthContext } from '@/contextapi/UserAuthContext';
import { Trash2 } from 'lucide-react';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const AllBlogs = () => {
  const { session } = useContext(UserAuthContext);
  const router = useRouter()
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(4);
const isFirstRender = useRef(true);



// deleting post from db 
  async function DeletePost(slugValue) {
    const res = await fetch(`https://next-blog-sand-ten-63.vercel.app/api/posts?slug=${slugValue}`,{
        method : 'DELETE',
        headers : {
           'Content-Type': 'application/json'
        },
        body : JSON.stringify('deletePost')
    })
    if(res.ok) {
        let newCountPosts = data.filter(i => i.slug != slugValue)
        setData(newCountPosts)
    }
  }
  async function blogData(page) {
    try {
        let response = await fetch(`https://next-blog-sand-ten-63.vercel.app/api/blog?page=${page}`);
        if (response.ok) {
            let { result, count } = await response.json();
            
            setData(prev => [...prev, ...result]);
            setCount(count);
        }
    } catch (err) {
        console.log('There is an error', err);
    }
}

useEffect(() => {
    if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
    }
    blogData(page);
}, [page]);


  return (
    <div className="w-full h-full bg-inputBg py-8 lg:px-12 px-3">
  <h1 className="text-3xl font-bold">All Blogs</h1>

  {data?.map((i) => {
    

    return (
      <div key={i.id} className="box flex flex-col md:flex-row  mt-6 bg-hoverBg w-full md:w-5/6 mx-auto h-auto md:h-48 relative">
        <div className="absolute top-2 right-2 z-10">
        <Trash2 className='hover:scale-125 cursor-pointer' onClick={()=> DeletePost(i.slug)} />
         </div>

        <div className="imgWrapper overflow-hidden md:m-5 w-full md:w-1/3 relative h-48 md:h-auto">
          <Image alt="no image" src={i.img} fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="w-full md:w-2/3 p-4 overflow-hidden md:px-4 md:pt-6">
          <div onClick={() => router.push(`/posts/singlepost?slug=${i.slug}`)} className="md:text-2xl cursor-pointer hover:text-blue-600 text-xl font-bold headers">{i.title.substring(0, 40)}</div>
          <div className="des md:text-md text-sm font-normal">{i.subDes.substring(0, 80)}</div>
        </div>
      </div>
    );
  })}

  {data.length === 0 && (
    <div className="text-3xl text-center mt-10">No Posts yet</div>

  )}
   <div className="flex justify-center py-8">
                <button 
                    disabled={Math.ceil(count / 4) === page}
                    onClick={() => setPage(prev => prev + 1)}
                    className={`px-4 py-2 rounded-lg text-white ${Math.ceil(count / 4) === page ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'}`}
                >
                    View More
                </button>
            </div>
</div>
  )
};

export default AllBlogs;
