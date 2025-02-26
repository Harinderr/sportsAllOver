"use client";
import Post from "@/components/post/post";
import Menu from "../menu/menu";
import styles from "@/components/Blog/blog.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import FadeInUp from "@/lib/loadingTransition";


export default function Blog({ page , cat }) {
  const [count, setCount] = useState(0);
  const router = useRouter();
  const { isPending, error, data} = useQuery({
    queryKey : ['blog-posts',{page, cat}],
    queryFn : blogData,
    staleTime: 1000 * 60 * 5, // Optional: Cache freshness duration
    refetchOnWindowFocus: false, // Optional: Disable refetching on window focus

  })
  // Fetch data from the API
  async function blogData({queryKey}) {
    const [,{page,cat}] = queryKey;
      let response = await fetch(`/api/blog?page=${page}${cat ? `&cat=${cat}` : ''}`);
        const res = await response.json()
        setCount(res.result.length)
        return res.result;
        }
  if(isPending) return <Loader></Loader>
  if(error){
    console.log(error)
    return <p>There is error</p>
  }
  return (
   
    <div className="bg-bgBlack w-full px-4 pb-10">
      <h1 className="text-4xl font-bold text-center py-10" id="latest">
        LATEST
      </h1>
    <FadeInUp>
      {/* Responsive wrapper for blog posts */}
      <div className="flex flex-wrap justify-center gap-6 px-2">
        {data?.map((val, index) => (
          <Post
            key={index}  // Ensure each Post component has a unique key
            src={val.img}
            slug={val.slug}
            title={val.title}
            subDes={val.subDes}
            date={val.createdAt}
            id={val.id}
            catSlug={val.catSlug}
          />
        ))}
      </div>
      </FadeInUp>
      {/* Button Wrapper */}
      <div className="flex justify-center py-8 transition-opacity duration-1000 ease-in ">
        <button
          disabled={Math.ceil(count / 4) === page}
          onClick={() => {
            const nextPage = page + 1;
            router.push(`/?page=${nextPage}${cat ? "&cat=" + cat : ""}`);
          }}
          className={`px-4 py-2 rounded-lg text-white ${
            Math.ceil(count / 4) === page
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700 cursor-pointer"
          }`}
        >
          View More
        </button>
      </div>
    </div>
   
  );
}
