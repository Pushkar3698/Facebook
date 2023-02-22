import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { FeedUI } from "../../components/feedUI/FeedUI";

import { Header } from "../../components/header/Header";

import { user_Data } from "../../redux/actions";

export const Feed = ({ token }) => {
  const [userData, setuserData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const fetchData = await fetch("http://localhost:8000/feed/home", {
        method: "POST",
        headers: {
          Authorization: "Bearer=" + token,
        },
      });
      if (!fetchData.ok) {
        navigate("/");
      }

      const res = await fetchData.json();

      dispatch(user_Data(res));
      setuserData(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <Header userData={userData} />

      <FeedUI userData={userData} />
    </>
  );
};
