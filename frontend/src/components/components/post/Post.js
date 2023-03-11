import React, { useState } from "react";
import "./style.css";
import { motion } from "framer-motion";
import CommentBox from "./CommentBox";
import ReactDOM from "react-dom";
import Comment from "./Comment";

const CommentModal = ({ modalHandler, comments }) => {
  return (
    <div className="comment-modal">
      <motion.div
        className="show-comments"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
      >
        <div className="close-box">
          <p onClick={() => modalHandler(false)}> X</p>
        </div>
        <div>
          {comments.map((el, i) => (
            <Comment
              modalHandler={modalHandler}
              comment={el.comment}
              key={el._id}
              id={el._id}
              user={el.userId.firstname + " " + el.userId.lastname}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const Modal = ({ modalHandler, comments }) => {
  return ReactDOM.createPortal(
    <CommentModal modalHandler={modalHandler} comments={comments} />,
    document.getElementById("modal")
  );
};

export const Post = ({
  createdAt,
  id,
  firstname,
  lastName,
  text,
  likes,
  userId,
  token,
  comments,
  imagePath,
  filename,
}) => {
  const [deleteError, setdeleteError] = useState(false);
  const [commentBox, setcommentBox] = useState(false);
  const [modal, setmodal] = useState(false);

  const modalHandler = (val) => {
    setmodal(val);
  };

  const oldDate = new Date(createdAt);
  const liked = likes.includes(userId);

  const data = {
    postId: id,
    userId: userId,
  };

  const deletePostHandler = async () => {
    const fetchData = await fetch("http://localhost:8000/feed/deletePost", {
      method: "POST",

      headers: {
        Authorization: "Bearer=" + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await fetchData.json();

    if (res.status === 400) {
      setdeleteError(true);
    }
  };

  const likeIncreaseHandler = async () => {
    const fetchData = await fetch("http://localhost:8000/feed/addLike", {
      method: "POST",

      headers: {
        Authorization: "Bearer=" + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await fetchData.json();
  };

  return (
    <motion.div
      className="post"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="post-header">
        <div className="header-left">
          <img
            src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
            alt=""
          />
          <div className="header-details">
            <p style={{ fontWeight: "500" }}>
              {`${firstname[0].toUpperCase() + firstname.slice(1)} ${lastName}`}
            </p>
            <p style={{ fontSize: "10px", color: "grey" }}>
              {oldDate.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="post-delete" onClick={deletePostHandler}>
          x
        </div>
      </div>
      <div className="post-text">
        <p>{text}</p>
      </div>
      {imagePath && (
        <div className="post-image">
          <img src={"http://localhost:8000/" + filename} alt="" />
        </div>
      )}
      <div className="post-likes">
        <p>{likes.length} people like this post</p>
        <p className="commented-people" onClick={() => setmodal(true)}>
          {comments.length} comments
        </p>
      </div>
      <div className="post-actions">
        <div
          className="post-like"
          style={{
            color: `${liked ? "blue" : ""}`,
            fontWeight: `${liked ? "600" : ""}`,
          }}
          onClick={likeIncreaseHandler}
        >
          Like
        </div>
        <div
          className="post-comment"
          style={{
            color: `${commentBox ? "blue" : ""}`,
            fontWeight: `${commentBox ? "600" : ""}`,
          }}
          onClick={() => setcommentBox(!commentBox)}
        >
          Comment
        </div>
      </div>
      {modal && <Modal modalHandler={modalHandler} comments={comments} />}
      {commentBox && (
        <CommentBox
          modalHandler={modalHandler}
          comments={comments}
          data={data}
          token={token}
        />
      )}
    </motion.div>
  );
};
