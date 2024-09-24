import Blog from "@/components/Blog/blog";
export default function MyBlog({searchParams}) {
    const {page,cat} = searchParams;
        const pagenumber = parseInt(page, 10)
    return (
        <div className="w-full ">
            <div className="category capitalize text-2xl text-center font-bold pt-2 w-full h-12 bg-blue-600 text-white">
             {cat}
            </div>
            <Blog page={pagenumber} cat={cat}></Blog>
        </div>
    )
}