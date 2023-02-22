import { ArrowRight, Plus } from "../../resources/svg";
import "./style.css";
// import { stories } from "./data";
import Story from "./Story";
import image1 from "./images/1.jpg";
import profile1 from "./images/profile1.jpg";
import image2 from "./images/2.png";
import profile2 from "./images/profile2.jpg";
import image3 from "./images/3.jpg";
import profile3 from "./images/profile3.png";
import image4 from "./images/4.jpg";
import profile4 from "./images/profile4.jfif";
import image5 from "./images/5.jfif";
import profile5 from "./images/profile5.png";

export default function Stories() {
  const stories = [
    {
      profile_picture: profile1,
      profile_name: "Elon Musk",
      image: image1,
    },
    {
      profile_picture: profile2,
      profile_name: "South park",
      image: image2,
    },
    {
      profile_picture: profile3,
      profile_name: "The Sopranos",
      image: image3,
    },
    {
      profile_picture: profile4,
      profile_name: "Football World",
      image: image4,
    },
    {
      profile_picture: profile5,
      profile_name: "The Witcher Wild Hunt",
      image: image5,
    },
  ];

  return (
    <div className="stories">
      <div className="create_story_card">
        <img
          src="https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png"
          alt=""
          className="create_story_img"
        />
        <div className="plus_story">
          <Plus color="#fff" />
        </div>
        <div className="story_create_text">Create Story</div>
      </div>
      {stories.map((story, i) => (
        <Story story={story} key={i} />
      ))}
      <div className="white_circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
