import { useEffect, useState } from "react";
import styles from "./comment.module.css";
import { useSession } from "next-auth/react";
import { Cmt } from "../category/cmt";

export default function Comment({ slug }) {
  const { data, status } = useSession();
  const [formData, setFormData] = useState({});
  const [comment, setComment] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState(null);
  const [cmtReplies, setCmtReplies] = useState({});
  const [loading, setLoading] = useState(false);
  const [cmtRepliesVisiblity, setCmtRepliesVisiblity] = useState({})

  // Fetch all comments
  const commentData = async () => {
    try {
      let response = await fetch(`/api/comment?slug=${slug}`);
      if (response.ok) {
        const { result } = await response.json();
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setComment(result);
      }
    } catch (err) {
      throw new Error("Data not fetched");
    }
  };

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
      setLoading(true);
      const response = await fetch(`/api/comment?slug=${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setLoading(false);
        commentData(); // Refresh comments after adding new one
      }
    } catch (err) {
      setLoading(false);
      console.log("There is an error" + err);
    }
  }

  // Function to load replies for a given comment or reply
  async function loadReplies(cmtId, type) {
    try {
      let res = await fetch(`/api/replies?cmtId=${cmtId}&type=${type}`);
      if (res.ok) {
        const { result } = await res.json();
        setCmtReplies((prev) => ({
          ...prev,
          [cmtId]: result,
        }));
        setCmtRepliesVisiblity((prev)=> ({
          ...prev, 
          [cmtId] : true,
        }))
      }
    } catch (error) {
      console.log("There is an error while loading replies");
    }
  }

  useEffect(() => {
    commentData();
  }, [slug]);

  return (
    <div className={`${styles.container} bg-[#323432] p-4 py-10`}>
      <div className="wrapper sm:w-4/5 sm:mx-auto w-full">
        {/* Comment Form */}
        <form onSubmit={(e) => handleComment(e)} className="flex flex-row">
          <div className="flex flex-row w-full rounded-xl overflow-hidden">
            <input
              onChange={(e) => handleChange(e)}
              type="text"
              name="comment"
              id="comment"
              placeholder="Enter you comment"
              className="outline-none bg-bgBlack focus:bg-hoverBg"
            />
            <button
              disabled={loading}
              type="submit"
              className="bg-blue-600 px-4 disabled:opacity-40"
            >
              {loading ? "Posting Comment" : "Comment"}
            </button>
          </div>
        </form>

        {/* Comments Section */}
        <div className={`${styles.comment_form} flex flex-col gap-2`}>
          {!comment.length && <p className="text-center">No comments yet</p>}
          {comment.map((item) => (
            <Cmt
              key={item.id}
              val={item}
              type={"comment"}
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
      </div>
    </div>
  );
}
