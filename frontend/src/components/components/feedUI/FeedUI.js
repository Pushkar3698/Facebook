import React, { useState, useEffect } from "react";
import Stories from "../stories/index.js";
import "./style.css";
import CreatePost from "../createPost/index.js";
import Loader from "../Loader/Loader.js";
import { useSelector, useDispatch } from "react-redux";
import openSocket from "socket.io-client";
import {
  add_Comment,
  create_Post,
  delete_Post,
  get_Posts,
  update_Like,
} from "../../redux/actions.js";
import { Post } from "../post/Post.js";

const socket = openSocket.connect("http://localhost:8000");

export const FeedUI = ({ userData }) => {
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const dispatch = useDispatch();
  const { token, posts } = useSelector((state) => state.reducer);
  const loader = (val) => {
    setloading(val);
  };

  const getPosts = async () => {
    try {
      setloading(true);
      const fetchData = await fetch("http://localhost:8000/feed/getPosts", {
        method: "GET",

        headers: {
          Authorization: "Bearer=" + token,
        },
      });
      if (!fetchData.ok) {
        seterror(true);
        return;
      }

      const res = await fetchData.json();

      dispatch(get_Posts(res));
      setloading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPosts();
    socket.on("posts", (data) => {
      dispatch(create_Post(data));
    });
    socket.on("like-post", (data) => {
      dispatch(update_Like(data));
    });
    socket.on("delete-post", (postId) => {
      dispatch(delete_Post(postId));
    });
    socket.on("add-comment", (data) => {
      dispatch(add_Comment(data));
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  return (
    <div className="feed-container">
      <div className="story-container">
        <Stories />
      </div>
      <CreatePost user={userData} loader={loader} />

      {loading && (
        <div className="feed-loader">
          <Loader />
        </div>
      )}
      <div className="posts-container">
        {!error &&
          posts.map((el, i) => (
            <Post
              key={el._id}
              createdAt={el.createdAt}
              id={el._id}
              firstname={el.creatorId.firstname}
              lastName={el.creatorId.lastname}
              text={el.text}
              creatorId={el.creatorId._id}
              likes={el.likes}
              userId={userData._id}
              token={token}
              comments={el.comments}
              imagePath={el.imagePath}
              filename={el.imageFileName}
            />
          ))}
      </div>
    </div>
  );
};
