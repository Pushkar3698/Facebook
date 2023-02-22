import React from "react";
import "./Header.css";
import {
  Logo,
  Friends,
  Watch,
  Market,
  Search,
  Home,
  Messenger,
  Plus,
  Notifications,
  ArrowDown1,
} from "../../resources/svg";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { user_Logout } from "../../redux/actions";

export const Header = ({ userData }) => {
  const dispatch = useDispatch();
  // const { firstname, lastname, picture } = useSelector(
  //   (state) => state.reducer.userData
  // );

  const userLogout = () => {
    dispatch(user_Logout());
  };
  return (
    <div className="fb-header">
      <div className="header-left">
        <div className="facebook-logo">
          <Logo />
        </div>
        <div className="search-bar">
          <Search />
          <input
            type="text"
            name=""
            id="search-bar"
            placeholder="Search Facebook"
          />
        </div>
      </div>

      <div className="header-middle">
        <div className="header-middle-logo">
          <div className="header-logo " style={{ fill: "blue" }}>
            <Home />
          </div>
          <div className="header-logo">
            <Watch />
          </div>
          <div className="header-logo">
            <Market />
          </div>
          <div className="header-logo">
            <NavLink to={"friends"}>
              <Friends />
            </NavLink>
          </div>
        </div>
      </div>

      <div className="header-right">
        <div className="user-profile">
          <div className="profile-pic">
            <img src={userData.picture} alt="" width={"35px"} />
          </div>
          <div className="user-name">
            <p>{userData.firstname + " " + userData.lastname}</p>
          </div>
        </div>
        <div className="header-right-logo">
          <div className="right-logo">
            <Plus />
          </div>
          <div className="right-logo">
            <Messenger />
          </div>
          <div className="right-logo">
            <Notifications />
          </div>
          <div className="right-logo" onClick={userLogout}>
            <ArrowDown1 />
          </div>
        </div>
      </div>
    </div>
  );
};
