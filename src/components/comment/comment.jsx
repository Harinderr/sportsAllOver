import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./comment.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { handleClientScriptLoad } from "next/script";
import { Cmt } from "../category/cmt";
export default function Comment({ slug }) {
  const { data, status } = useSession();
  const [formData, setFormData] = useState({});
  const [comment, setComment] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState(null);
  const [cmtReplies, setCmtReplies] = useState({});
  const [cmtRepliesVisiblity, setCmtRepliesVisiblity] = useState({});

  const commentData = async () => {
    try {
      let response = await fetch(
        `/api/comment?slug=${slug}`
      );
      if (response.ok) {
        const { result } = await response.json();
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComment(result);
      
      }
    } catch (err) {
      throw new Error("Data not fetched");
    }
  };
  //    const firstLett comment.user?.name.slice(0,1).toUpperCase()
  function handleChange(e) {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleComment(e) {
    e.preventDefault();
    if (status == "unauthenticated") {
      alert("login to comment");
      return false;
    }
    try {
      const response = await fetch(
        `/api/comment?slug=${slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        let result = await response.json();
        console.log("data send");
        commentData();
      }
    } catch (err) {
      console.log("There is an error" + err);
    }
  }

  async function loadReplies(cmtId) {
    try {
      let res = await fetch(`/api/replies?cmtId=${cmtId}`);
      if (res.ok) {
        const { result } = await res.json();

        setCmtReplies((prev) => ({
          ...prev,
          [cmtId]: result,
        }));

        setCmtRepliesVisiblity((prev) => ({
          ...prev,
          [cmtId]: true,
        }));
      }
    } catch (error) {
      console.log("There is an error while loading replies");
    }
  }

  useEffect(() => {
    commentData();
  }, [slug]);

  return (
    <div className={`${styles.container} bg-[#323432] p-4 py-10  `}>
      <div className="wrapper xs:w-4/5 xs:mx-auto">

      
      <form
        onSubmit={(e) => handleComment(e)}
        action=""
        className="flex flex-row "
      >
      
       <div className="flex flex-row w-full rounded-xl overflow-hidden">
       <input
          onChange={(e) => handleChange(e)}
          type="text"
          name="comment"
          id="comment"
          placeholder="Enter you comment"
          className="outline-none bg-bgBlack focus:bg-hoverBg "
        />
        <button type="submit" className="bg-blue-600 px-4 ">
          Post
        </button>
        </div> 
      </form>
      <div className={`${styles.comment_form} flex flex-col gap-2 `}>
        {!comment.length && <p className="text-center">No comments yet</p>}
        {comment.map((item) => {
          return (
            <>
              <Cmt
              key={item.id}
                val={item}
                type={"comment"}
                slug={slug}
                loadReplies={loadReplies}
                selected={selected}
                setSelected={setSelected}
                setReply={setReply}
                reply={reply}
                setCmtReplies={setCmtReplies}
              ></Cmt>
              {cmtRepliesVisiblity[item.id] &&
                (cmtReplies[item.id]?.length ? (
                  cmtReplies[item.id]?.map((val) => {
                    return (
                      <Cmt
                      key={val.id}
                        val={val}
                        type={"replies"}
                        slug={slug}
                        selected={selected}
                        setSelected={setSelected}
                        reply={reply}
                        setReply={setReply}
                        setCmtReplies={setCmtReplies}
                        setCmtRepliesVisiblity={setCmtRepliesVisiblity}
                      ></Cmt>
                    );
                  })
                ) : (
                  <span>No replies yet</span>
                ))}

              {cmtRepliesVisiblity[item.id] && (
                <>
                  <span
                    onClick={() =>
                      setCmtRepliesVisiblity((prev) => ({
                        ...prev,
                        [item.id]: false,
                      }))
                    }
                    className="text-blue-500 mx-auto text-sm cursor-pointer"
                  >
                    Hide replies
                  </span>
                  <span></span>
                </>
              )}
            </>
          );
        })}
      </div>
      </div>
    </div>
  );
}
