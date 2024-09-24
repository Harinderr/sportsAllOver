"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/navbar/navbar.module.css";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserProfileDropdown from "@/components/userProfileDropdown"
import Hamburger from "./hamburger";


export default function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const { data, status } = useSession();
  const router = useRouter();

  const handleProfile = () => {
    setIsopen(!isOpen);
  };

  const firstLetter =
    data?.user?.username?.slice(0, 1).toUpperCase() ||
    data?.user?.name?.slice(0, 1).toUpperCase() ||
    "";

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    } else {
      router.push("/");
    }
  }, []);

  return (
    <>
      <div className={`${styles.container} w-full flex h-20 bg-[#0E0E0E]`}>
        <div
          className={`${styles.outlay} flex justify-between items-center w-full px-4 sm:px-10 lg:px-24 xl:px-36`}
        >
          {/* Brand Name */}
          <div className=" text-2xl sm:text-3xl md:text-4xl font-extrabold w-1/2">
            Sports<span className="text-blue-600">All</span>Over
          </div>

          {/* Desktop Nav Links (Hidden on mobile, shown on larger screens) */}
          <div className="hidden sm:flex justify-between items-center w-1/2 text-sm lg:text-xl">
            <Link className={styles.nav_link} href={"/"}>
              HOME
            </Link>
            <Link className={styles.nav_link} href={"#latest"}>
              LATEST
            </Link>
            <Link className={styles.nav_link} href={"#"}>
              ABOUT
            </Link>

            <UserProfileDropdown status={status} data={data}></UserProfileDropdown>
          </div>

          {/* Mobile Hamburger Menu (Shown on smaller screens, hidden on larger screens) */}
          <div className="flex sm:hidden">
            <Hamburger status={status} />
          </div>
        </div>
      </div>
    </>
  );
}
