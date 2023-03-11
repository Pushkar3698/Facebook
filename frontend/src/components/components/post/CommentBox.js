import React from "react";
import Comment from "./Comment";
import CreateComment from "./CreateComment";

const CommentBox = ({ modalHandler, comments, data, token }) => {
  return (
    <>
      <div className="comments-container">
        {comments.length !== 0 && (
          <Comment
            modalHandler={modalHandler}
            comment={comments[comments.length - 1].comment}
            key={comments[comments.length - 1]._id}
            id={comments[comments.length - 1]._id}
            user={
              comments[0].userId.firstname + " " + comments[0].userId.lastname
            }
            number={0}
          />
        )}
      </div>
      <CreateComment data={data} token={token} />
    </>
  );
};

export default CommentBox;
