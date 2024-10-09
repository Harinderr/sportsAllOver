"use client";
import Post from "@/components/post/post";
import Menu from "../menu/menu";
import styles from "@/components/Blog/blog.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Blog({ page , cat }) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const router = useRouter();

  // Fetch data from the API
  async function blogData(page, cat) {
    try {
      let response = await fetch(`/api/blog?page=${page}${cat ? `&cat=${cat}` : ''}`);
      if (response.ok) {
        let { result, count } = await response.json();
        // Append the new posts to the existing data
        if(page == 1) {
          setData(result)
        }
        else {

          setData((prevData) => [...prevData, ...result]);  // Use spread operator to append
        }
        setCount(count);
      }
    } catch (err) {
      console.log("There is an error", err);
    }
  }

  // Fetch data when the component mounts or when page/cat changes
  useEffect(() => {
   
    blogData(page, cat); // Fetch posts for the current page and category
  }, [page, cat]); // Only refetch when `page` or `cat` changes

  return (
    <div className="bg-bgBlack w-full px-4 pb-10">
      <h1 className="text-4xl font-bold text-center py-10" id="latest">
        LATEST
      </h1>

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

      {/* Button Wrapper */}
      <div className="flex justify-center py-8">
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
