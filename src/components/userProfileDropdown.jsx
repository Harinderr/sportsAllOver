import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const UserProfileDropdown = ({ status, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const firstLetter = data?.user?.name?.[0] || "U"; // Default letter if user name doesn't exist

  // Toggle dropdown when image is clicked
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      {status === "authenticated" ? (
        <div className="relative" ref={dropdownRef}>
          <div
            className="relative w-8 h-8 border-2 border-white rounded-full cursor-pointer"
            onClick={handleToggleDropdown}
          >
            {data?.user?.image ? (
              <Image
                src={data.user.image}
                alt="Profile Image"
                objectFit="cover"
                layout="fill"
                className="rounded-full"
              />
            ) : (
              <div className="profile_container w-10">
                <div className="box w-8 h-8 bg-red-300 flex justify-center items-center rounded-full text-xl font-bold">
                  <p>{firstLetter}</p>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown menu */}
          {isOpen && (
            <ul className="absolute right-0 mt-2 bg-bgBlack shadow-lg rounded-lg p-2 w-64">
              <li className="hover:bg-hoverBg px-4 rounded-md py-4">
                <Link onClick={() => setIsOpen(false)} href="/profile" >Dashboard</Link>
              </li>
              <li className="hover:bg-hoverBg rounded-md px-4 py-4">
                <Link onClick={() => setIsOpen(false)} href="/logout">Logout</Link>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <Link
          className="bg-blue-500 px-3 py-2 rounded-full border-white hover:bg-blue-400"
          href="/form/login"
        >
          Login
        </Link>
      )}
    </>
  );
};

export default UserProfileDropdown;