import Blog from "@/components/Blog/blog";
export default function MyBlog({searchParams}) {
    const {page,cat} = searchParams;
        const pagenumber = parseInt(page, 10)
    return (
        <div className="w-full bg-bgBlack pt-8">
            <div id="pointer" className=" capitalize text-2xl w-1/6 mx-auto skew-x-3 flex justify-center items-center text-center font-bold   h-12 bg-blue-600 text-white">
             {cat}
            </div>
            <Blog page={pagenumber} cat={cat}></Blog>
        </div>
    )
}