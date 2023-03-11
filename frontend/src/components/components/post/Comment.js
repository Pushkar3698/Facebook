import React from "react";

const comment = ({ modalHandler, comment, id, number, user }) => {
  return (
    <div className="comment" onClick={() => modalHandler(true)}>
      <div className="comment-by">
        <div className="user-img">
          <img
            src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
            alt=""
          />
          <div className="user-name-comment" style={{ marginLeft: "10px" }}>
            {user}
          </div>
        </div>

        {number !== 0 && (
          <div className="delete-comment" style={{ float: "right" }}>
            X
          </div>
        )}
      </div>
      <div className="comment-text">
        <p>{comment}</p>
      </div>
    </div>
  );
};

export default comment;
