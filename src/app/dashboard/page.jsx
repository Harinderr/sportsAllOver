import {  authoption, getAuthSession } from "@/utility/auth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react"


 const Dashboard = async () => {
   const session = await getAuthSession()
  
    return (
        <div className="container">
   this is admin page 
        </div>
    )
} 
export default Dashboard;