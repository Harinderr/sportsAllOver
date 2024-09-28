 import styles from "./popularpost.module.css"
 import Link from "next/link";
 import Image from "next/image";

 
export default function PopularPost({id,index, title,src, subDes,slug,catSlug}) {
    const fulldate = new Date()
    const date  =   fulldate.toISOString().split('T')[0];
   

    return (

        
      <div
  className={`${
    index == 0 ? 'xs:col-span-2 xs:row-span-2 ' : index == 1 ? 'xs:col-span-2 xs:row-span-1' : ''
  } group relative min-h-[12rem]  rounded-md`}
>
<span className="z-10 text-xs rounded-full capitalize font-normal border-2 text-white  border-blue-400 p-1 absolute right-1 top-1">{catSlug}</span>
  <Image
    className="rounded-md"
    src={src}
    layout="fill"
    objectFit="cover"
    alt="Post Image"
  />
  
  <div className="text-gray-200 z-10 absolute left-0 bottom-0 w-full bg-gradient-to-t from-gray-900 via-gray-900/90 to-transparent">
    <div className="boxWrapper p-4">
      <Link
        className="text-wrap h-auto font-semibold text-base md:text-xl hover:underline"
        href={`/posts/singlepost?slug=${slug}`}
      >
        {title.substring(0, 40) + '...'}
      </Link>
      <p className="text-sm md:text-base text-white opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-20 translate-all duration-1000">
        {subDes.substring(0, 80) + '...'}
      </p>
    </div>
  </div>
</div>

    )
}