"use client";
import styles from "@/components/menu/menu.module.css";
import PopularPost from "../popularpost/popularpost";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

async function getData() {
  const res = await fetch("/api/popular");
  const out = await res.json();
  return out.result;
}

export default function Menu() {
  const { isPending, error, data } = useQuery({
    queryKey: ["most-pop"],
    queryFn: getData,
    staleTime: 1000 * 60 * 5, // Optional: Cache freshness duration
    refetchOnWindowFocus: false, // Optional: Disable refetching on window focus
  });


  return (
    <div
      id="popular"
      className={`${styles.menu_container} bg-bgBlack md:px-10 px-4 pt-16 pb-20 w-full overflow-hidden h-auto`}
    >
      <h4 className={`${styles.heading} text-center mb-10 text-4xl font-bold`}>
        MOST POPULAR
      </h4>

      {/* Conditional rendering inside the component */}
      {isPending ? (
        <Loader className="text-center" />
      ) : error ? (
        <p>Error loading Data: {error.message}</p>
      ) : (
        <div
          className={`${styles.post_wrapper} px-4  md:px-10 lg:px-40`}
        > 
             <motion.div
             className=" grid grid-cols-1 xs:grid-cols-4 gap-3"
             initial={{ opacity: 0, y: 70 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             viewport={{ once: true }}
           >
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
          </motion.div>
        </div>
      )}
    </div>
  );
}