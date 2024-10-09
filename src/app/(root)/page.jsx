
import Blog from "@/components/Blog/blog";
import Category from "@/components/category/category";
import Feature from "@/components/featureSection/Feature";
import Menu from "@/components/menu/menu";
import ReviewsSection from "@/components/reviews";
import Search from "@/components/searchBar/search";


export default function Home({searchParams}) {
  const page = parseInt(searchParams.page) || 1
 const cat = searchParams.cat || '';
  
 
  return <div>
    <Feature></Feature>
    <Search></Search> 
    <Menu></Menu>
   <Blog page={page} cat={cat}></Blog>
   <ReviewsSection></ReviewsSection>
  </div>;
}
