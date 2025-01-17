"use client";
import styles from "@/components/menu/menu.module.css";
import Post from "../post/post";
import Image from "next/image";
import PopularPost from "../popularpost/popularpost";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
export default function Menu() {
  const { isPending, error, data } = useQuery({
    queryKey: ["most-pop"],
    queryFn: getData,
    staleTime: 1000 * 60 * 5, // Optional: Cache freshness duration
    refetchOnWindowFocus: false, // Optional: Disable refetching on window focus
  });
  async function getData() {
    const res = await fetch("/api/popular");
    const out = await res.json();
    return out.result
  }

  if (isPending) return <Loader className="text-center"></Loader>;
  if (error) return <p>Error loading Data : {error.message}</p>;

  return (
    <div
      id="popular"
      className={`${styles.menu_container} bg-bgBlack md:px-10 px-4 pt-16 pb-20 w-full overflow-hidden h-auto`}
    >
      <h4 className={`${styles.heading} text-center mb-10 text-4xl font-bold`}>
        MOST POPULAR
      </h4>

      {/* Grid layout that changes on different breakpoints */}
      <div className="post_wrapper px-4 grid grid-cols-1  xs:grid-cols-4 gap-3  md:px-8">
        {data?.map((item, index) => (
          <PopularPost
            key={item.id}
            index={index}
            id={item.id}
            src={item.img}
            title={item.title}
            subDes={item.subDes}
            slug={item.slug}
            catSlug={item.catSlug}
          />
        ))}
      </div>
    </div>
  );
}
