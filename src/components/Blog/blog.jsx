'use client'
import Post from "@/components/post/post"
import Menu from "../menu/menu"
import styles from "@/components/Blog/blog.module.css"
import { useRef, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Blog() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(4);
 const isFirstRender = useRef(true);

    async function blogData(page) {
        try {
            let response = await fetch(`http://localhost:3000/api/blog?page=${page}`);
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
        <div className=" bg-bgBlack w-full px-4 pb-10">
            <h1 className="text-4xl font-bold text-center py-10" id="latest">LATEST</h1>
            
            {/* Responsive wrapper for blog posts */}
            <div className="flex flex-wrap justify-center gap-6">
                {data.map((val) => (
                    <Post 
                        key={val.id} 
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
                    onClick={() => setPage(prev => prev + 1)}
                    className={`px-4 py-2 rounded-lg text-white ${Math.ceil(count / 4) === page ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 cursor-pointer'}`}
                >
                    View More
                </button>
            </div>
        </div>
    );
}
