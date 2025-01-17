"use client";
import styles from "./detailblog.module.css";
import Image from "next/image";
import Menu from "@/components/menu/menu";
import Comment from "@/components/comment/comment";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { stateToHTML } from "draft-js-export-html";

import { convertFromRaw } from "draft-js";
import { useQuery } from "@tanstack/react-query";
import { Loader, Loader2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function DetailBlog() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [postContent, setPostContent] = useState(null);
  const [time, setTime] = useState("");
  const { isPending, error, data } = useQuery({
    queryKey: slug ? [`${slug}`, { slug }] : [],
    queryFn: getBlog,
  });

  async function getBlog({ queryKey }) {
    const [, { slug }] = queryKey;
    const response = await fetch(`/api/posts/singlepost?slug=${slug}`);
    const out = await response.json();
    console.log(out);
    return out.result;
  }

 
  

  const firstLetter = data?.user?.name?.slice(0, 1).toUpperCase();
  const image = data?.user?.image;
  useEffect(() => {
    if (!data?.des) {
      // If data.des is undefined or null, skip the processing
      return;
    }
try {
  // Parse the content if it's available
      const rawContent = JSON.parse(data.des);
      // Ensure the parsed content is valid before converting
      if (rawContent) {
        // Convert from Raw JSON to Draft.js Content State
        const contentState = convertFromRaw(rawContent);
      // Convert Content State to HTML
        const htmlContent = stateToHTML(contentState);
         // Set the converted HTML content
        setPostContent(htmlContent);
      }
    } catch (error) {
      console.error("Error parsing or converting content:", error);
    }
  }, [data?.des]);
  if (isPending) return <Loader2></Loader2>;
  if (error) return <p>The Error: {error}</p>;
  return (
    <div className={styles.blog_box}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>{data.title}</h1>
          <div className={`${styles.user} mb-8`}>
            {image ? (
              <Image src={image} alt="User Image" height={50} width={50} />
            ) : (
              <div className="box w-8 h-8 bg-red-300 text-black flex justify-center align-middle rounded-full text-md font-bold">
                <p className="drop-shadow-md">{firstLetter}</p>
              </div>
            )}
            <div className={styles.userDetail}>
              <p>{data.user?.name}</p>
              <p>{formatDate(data?.createdAt)}</p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postContent }} />
          {/* <div className={styles.content}>
            <Image src={data?.img} alt="no image" height={300} width={300} />
            <p className={`${styles.description} white-space: pre-wrap`}>{data.des}</p>
          </div> */}
        </div>
      </div>
      <Comment slug={slug} />
    </div>
  );
}
