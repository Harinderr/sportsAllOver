'use client';
import styles from "./detailblog.module.css";
import Image from "next/image";
import Menu from "@/components/menu/menu";
import Comment from "@/components/comment/comment";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { stateToHTML } from 'draft-js-export-html';

import { convertFromRaw } from "draft-js";

export default function DetailBlog() {
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug');
  const [postContent ,setPostContent] = useState(null)
  const [data, setData] = useState({});
  const [time, setTime] = useState('');

  useEffect(() => {
    async function getBlog(slug) {
      try {
        const response = await fetch(`/api/posts/singlepost?slug=${slug}`);
        if (response.ok) {
          const { result } = await response.json();
          
          setData(result);
        } else {
          console.error('Failed to fetch blog data:', response.statusText);
        }
      } catch (err) {
        console.error('Error fetching blog data:', err);
      }
    }

    if (slug) {
      getBlog(slug);
    }
  }, [slug]);

  useEffect(() => {
    const date = new Date(data.createdAt);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setTime(`${day}-${month}-${year}`);
  }, [data.createdAt]);

  const firstLetter = data.user?.name?.slice(0, 1).toUpperCase();
  const image = data.user?.image;
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
        const htmlContent = stateToHTML(contentState)
        
        // Set the converted HTML content
        setPostContent(htmlContent);
      }
    } catch (error) {
      console.error('Error parsing or converting content:', error);
    }
  }, [data.des]);
  
 
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
              <p>{time}</p>
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
