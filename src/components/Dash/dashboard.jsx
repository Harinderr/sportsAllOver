// app/DashboardClient.js
"use client";
import Modal from "@/components/PopupModal"
import Image from "next/image";
import styles from "./dashboard.module.css"
import Logout from "@/components/logoutButton/logout";
import { useState } from "react";
import ChangeImageModel from "../changeImageModel";
import { useSession } from "next-auth/react";

export default function Dash() {
  const [isOpen, setIsOpen] = useState(false);
  const {data:session} =  useSession()
  const [isImgChangerOpen, setIsImgChangerOpen] = useState(false);
  if (!session) {
    return <div>Error loading session</div>;
  }

  function handleChangePassword() {
    try {
setIsOpen(true)
      
    } catch (error) {
      throw error
    }
  }
  
  const name = session?.user?.username || session?.user?.name;
  const email = session?.user?.email
  const img = session?.user?.image;
  const firstLetter = name?.slice(0, 1).toUpperCase();
console.log(session)
  return (
    <div className=" h-full w-full">
    <div className="wrapper h-full  mx-auto pt-10 bg-inputBg p-5 shadow-md">
      <h1 className="text-2xl font-bold">Welcome to the Dashboard, <span className="text-blue-500">{name}</span> </h1>
      <div className="profile flex flex-col gap-4 mt-4">
        {img ? (
          <div className="relative w-44 h-44 border-8 mx-auto border-white rounded-full">
            <Image src={img} alt="Profile Image" objectFit="cover" layout="fill" className="rounded-full" />
          </div>
        ) : (
          <div className="profile_container w-28 mx-auto">
            <div className="box w-28 h-28 bg-red-300 text-black flex justify-center items-center rounded-full text-8xl font-bold">
              <p className="drop-shadow-md">{firstLetter}</p>
            </div>
            <h2 className="text-center mt-2 font-bold">{name}</h2>
          </div>
        )}
      </div>
      <div className="user-info mt-4">
        <h2 className="text-xl font-bold">User Information</h2>
        <p>Email: {email}</p>
        <div className="btn_wrapper flex gap-2">
        <button onClick={handleChangePassword}  className="btn mt-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-500">Change Password</button>
        <button onClick={() => setIsImgChangerOpen(true)} className="btn mt-2 bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-500">Change Profile Image</button>
       </div>
      </div>
      
      <Logout />
    </div>
  { isOpen &&  <Modal setIsOpen={setIsOpen} email={session?.user?.email}></Modal>}
  {isImgChangerOpen && <ChangeImageModel  src={img} setIsImgChangerOpen={setIsImgChangerOpen} email={session?.user?.email}></ChangeImageModel> }
  </div>
  );
}


