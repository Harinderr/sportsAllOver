'use client'
import Signup from "@/components/signupform/signup"
import Login from "@/components/loginform/login";


export default function UserAuth({params}) {
     const status = params && params?.userform || null;
    
    return (
<div>  
      
            {status == 'signup' && <Signup></Signup>}
            {status == 'login' && <Login></Login>} 



</div>
       
    )
}
// export async function getServerSideProps({ params }) {
//     // Fetch data based on the slug or any other logic
//     const data = await fetchData(params.slug);
  
//     // If data is null or undefined, assign default value
//     const props = {
//       data: data || null,
//     };
  
//     return {
//       props,
//     };
//   }