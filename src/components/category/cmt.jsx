import { useState } from "react";
import styles from "./category.module.css";
import { LiaReplySolid } from "react-icons/lia";
import { convertTime } from "@/lib/utils";
import Image from "next/image";

export const Cmt = ({
  status,
  val,
  slug,
  selected,
  setSelected,
  type,
  loadReplies,
  reply,
  setReply,
  cmtReplies,
  setCmtReplies,
  cmtRepliesVisiblity,
  setCmtRepliesVisiblity,
}) => {
  const [loading, setLoading] = useState(false);

  const handleReply = (cmId) => {
    setSelected(selected === cmId ? null : cmId);
  };

  async function handlePostReply(commentId) {
    if (status == "unauthenticated") {
      alert("login to comment or reply");
      return false;
    }
    try {
      setLoading(true);
      console.log(reply)
      let res = await fetch(
        `/api/replies?slug=${slug}&${type === "replies" ? "replyId=" : "cmtId="}${commentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reply),
        }
      );
      if (res.ok) {
        setLoading(false);
        loadReplies(commentId, "replies"); // Refresh replies after posting
      }
    } catch (error) {
      setLoading(false);
      console.log("There is an error while posting the reply", error);
    }
  }

  function handleCancel() {
    setReply(null);
    setSelected(null);
  }

  return (
    <div
      className={`${styles.comment_container} ${
        type === "replies" && "ml-1 mb-4 border-[1px] border-slate-600"
      } rounded-xl bg-bgBlack  sm:px-8 sm:py-4 px-4 py-4`}
    >
      {/* User Details */}
      <div className={`${styles.user} flex flex-row gap-4`}>
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
            <div className="box w-8 h-8 bg-red-300 flex justify-center items-center rounded-full  font-bold">
              <p>{val?.name?.slice(0, 1)}</p>
            </div>
          </div>
        )}
        <div className="detail text-sm">
          <p>{val?.name}</p>
          <p>{convertTime(val.createdAt)}</p>
        </div>
      </div>

      {/* Comment Text */}
      <div className={`${styles.comment}  text-sm py-2`}>{val.des}</div>

      {/* Action Buttons (View/Hide Replies and Reply) */}
      <div className="impressionsBox xs:w-1/2 w-full flex flow-row justify-around ml-auto">
        <span
          onClick={() => {
            if (!cmtRepliesVisiblity[val.id]) {
              // If replies are not visible, load them and then show
              loadReplies(val.id, type);
            } else {
              // If replies are visible, just toggle the visibility
              setCmtRepliesVisiblity((prev) => ({
                ...prev,
                [val.id]: !prev[val.id],
              }));
            }
          }}
          className="text-blue-500 text-sm cursor-pointer"
        >
          {cmtRepliesVisiblity[val.id] ? "Hide replies" : "View replies"}
        </span>
        <div onClick={() => handleReply(val.id)} className="ml-auto flex flex-row justify-center items-center gap-2 cursor-pointer">
          <span className="text-sm hover:text-blue-400">Reply</span>
          <LiaReplySolid className="text-sm  hover:text-blue-400" />
        </div>
      </div>

      {/* Reply Input Box */}
      {selected === val.id && (
        <div className="reply flex justify-around flex-col xs:flex-row gap-2 mt-4">
          <input
            onChange={(e) => setReply(e.target.value)}
            type="text"
            placeholder="Enter your reply"
            className="border-white bg-gray-700 rounded-full w-full xs:w-2/3 outline-gray-700 p-2"
          />
          <div className="flex flex-row justify-between">
            <button
              onClick={handleCancel}
              className="bg-[var(--softBg)] text-white border-2 px-2 hover:bg-red-500 hover:border-red-500 border-gray-400 rounded-full"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={() => handlePostReply(val.id)}
              className="reply text-center text-sm disabled:opacity-40 hover:bg-blue-400 cursor-pointer hover:text-white px-3 text-blue-400 border border-blue-400 rounded-full"
            >
              {loading ? "Replying..." : "Reply"}
            </button>
          </div>
        </div>
      )}

      {/* Render Replies Recursively */}
      {cmtRepliesVisiblity[val.id] &&
        (cmtReplies[val.id]?.length > 0 ? (
          <div className="nested-replies mt-2">
            {cmtReplies[val.id].map((i) => (
              <Cmt
                key={i.id}
                val={i}
                type="replies"
                slug={slug}
                loadReplies={loadReplies}
                selected={selected}
                setSelected={setSelected}
                reply={reply}
                setReply={setReply}
                cmtReplies={cmtReplies}
                setCmtReplies={setCmtReplies}
                cmtRepliesVisiblity={cmtRepliesVisiblity}
                setCmtRepliesVisiblity={setCmtRepliesVisiblity}
              />
            ))}
          </div>
        ) : (
          <div className="text-center  py-2 text-[4px] sm:text-sm text-slate-300">
            No Replies yet
          </div>
        ))}
    </div>
  );
};
