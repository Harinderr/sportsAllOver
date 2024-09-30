import React from "react";
import styles from "./category.module.css";
import { LiaReplySolid } from "react-icons/lia";
import { convertTime } from "@/lib/utils";
import Image from "next/image";
export const Cmt = ({ val, slug, selected, setSelected,type, loadReplies, reply, setReply }) => {
  
  const handleReply = (cmId) => {
    setSelected(selected == cmId ? null : cmId);
  };

  async function handlePostReply(commentId) {
    try {
      let res = await fetch(
        `/api/replies?slug=${slug}&cmtId=${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reply),
        }
      );
      if (res.ok) {
        let result = await res.json();
        console.log(result);
      }
    } catch (error) {
      console.log("There is error in sending reply",error);
    }
  }

  function handleCancel() {
    setReply(null);
    setSelected(null);
  }

  return (
    <div
      className={`${styles.comment_container} ${type == 'replies' && 'ml-8' } rounded-xl bg-bgBlack px-8 py-4 `}>
      <div className={`${styles.user} flex flex-row gap-4 `}>
      {val?.image ? (
        <div className="relative w-8 h-8">
              <Image
                src={val.image}
                alt="Profile Image"
                objectFit="cover"
                layout="fill"
                className="rounded-full"
              />
              </div>
            ) : (
              <div className="profile_container w-10">
                <div className="box w-8 h-8 bg-red-300 flex justify-center items-center rounded-full text-xl font-bold">
                  <p>{val.name.slice(0,1)}</p>
                </div>
              </div>
            )}
        <div className="detail text-sm ">
          <p>{val.name}</p>
          <p>{convertTime(val.createdAt)}</p>
        </div>
      </div>
      <div className={`${styles.comment} py-2 `}>{val.des}</div>

      <div className="impressionsBox xs:w-1/2 w-full flex flow-row justify-around ml-auto">
        <span
          onClick={() => loadReplies(val.id)}
          className="text-blue-500 text-sm cursor-pointer"
        >
          View replies
        </span>
        <div
          onClick={() => handleReply(val.id)}
          className="ml-auto flex flex-row  gap-2  cursor-pointer border-b-2 border-blue-400 w-16"
        >
          <span className="text-[16px] hover:text-blue-400 ">Reply</span>
          <LiaReplySolid className="text-[24px] hover:text-blue-400" />
        </div>
      </div>
      <div
        className={`${
          selected === val.id ? "flex" : "hidden"
        } reply  justify-around flex-col xs:flex-row gap-2 mt-4`}
      >
        <input
          onChange={(e) => setReply(e.target.value)}
          type="text"
          placeholder="Enter you reply"
          className="border-white bg-gray-700 rounded-full w-full xs:w-2/3 outline-gray-700 p-2"
        />
        <div className="flex flex-row justify-between">
        <button
          onClick={handleCancel}
          className=" bg-[var(--softBg)] text-white border-2 px-2 hover:bg-red-500 hover:border-red-500  border-gray-400 rounded-full"
        >
          Cancel
        </button>
        <button
          onClick={() => handlePostReply(val.id)}
          className="reply  text-center text-sm hover:bg-blue-400 cursor-pointer hover:text-white px-3 text-blue-400 border border-blue-400 rounded-full"
        >
          Reply
        </button>
        </div>
        
      </div>
    </div>
  );
};
