
import Blog from "@/components/Blog/blog";
import Category from "@/components/category/category";
import Feature from "@/components/featureSection/Feature";


export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1
 
  
 
  return <div>
    <Feature></Feature>
    <Category></Category>
    <Blog page={page}></Blog>
  </div>;
}
