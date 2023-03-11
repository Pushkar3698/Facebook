import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Feeling, LiveVideo, Photo } from "../../resources/svg";
import "./style.css";

export default function CreatePost({ user, loader }) {
  const [error, seterror] = useState(false);
  const [photo, setphoto] = useState(false);
  const [image, setimage] = useState("");
  const [text, settext] = useState("");

  const { token } = useSelector((state) => state.reducer);

  const contentRef = useRef();

  const createPost = async () => {
    try {
      if (text === "") {
        return;
      }

      loader(true);

      const form = new FormData();

      form.append("text", text);
      form.append("image", image);
      form.append("createdBy", user._id.toString());
      form.append("createdAt", new Date());

      const fetchData = await fetch("http://localhost:8000/feed/createPost", {
        method: "POST",
        body: form,
      });

      if (!fetchData.ok) {
        loader(false);
        seterror(true);
        const error = new Error("could not create post");
        throw error;
      }

      const res = await fetchData.json();

      settext("");
      loader(false);
    } catch (err) {
      console.log(err);

      loader(false);
      seterror(true);
    }
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (error) {
        seterror(false);
      }
    }, 4000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [error]);

  return (
    <div className="createPost">
      <div className="createPost_header">
        <img
          src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
          alt=""
        />
        <div className="open_post hover2">
          <input
            type="text"
            name="create-post"
            placeholder={`What's on your mind , ${user?.firstname}`}
            className="create-post-input"
            onChange={(e) => settext(e.target.value)}
            value={text}
          />
          <div className="create-post-logo" onClick={createPost}>
            +
          </div>
        </div>
      </div>
      {error && <p className="create-post-error">could not create post</p>}
      <div className="create_splitter"></div>
      {photo && (
        <input
          type="file"
          name="image"
          style={{ padding: "0 15px", margin: "10px 0" }}
          onChange={(e) => setimage(e.target.files[0])}
        />
      )}
      <div className="createPost_body">
        <div className="createPost_icon hover1">
          <LiveVideo color="#f3425f" />
          Live Video
        </div>
        <div
          className="createPost_icon hover1 photo-video"
          onClick={() => setphoto(!photo)}
        >
          <Photo color="#4bbf67" />
          Photo/Video
        </div>
        <div className="createPost_icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div>
      </div>
    </div>
  );
}
