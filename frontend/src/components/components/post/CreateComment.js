import React, { useRef } from "react";

const CreateComment = ({ token, data }) => {
  const ref = useRef();

  const createCommentHandler = async () => {
    const postData = {
      ...data,
      comment: ref.current.value,
    };

    const fetchData = await fetch("http://localhost:8000/feed/addComment", {
      method: "POST",

      headers: {
        Authorization: "Bearer=" + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const res = await fetchData.json();
    ref.current.value = "";
  };

  return (
    <div className="comment-input">
      <div className="user-img">
        <img
          src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
          alt=""
        />
      </div>
      <div className="add-comment">
        <input
          type="text"
          name=""
          id=""
          placeholder="Add a comment"
          ref={ref}
        />
      </div>
      <div className="add-cmnt-btn">
        <button onClick={createCommentHandler}>add comment</button>
      </div>
    </div>
  );
};

export default CreateComment;
