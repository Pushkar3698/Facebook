import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserLoginData } from "../../redux/actions";
import Loader from "../../components/Loader/Loader";

export const LoginForm = () => {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState(null);
  const [loader, setloader] = useState(false);

  const emailRef = useRef();
  const passRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLoginData = (data, ref) => {
    setloginData((prev) => {
      const newState = { ...prev };
      newState[data] = ref.current.value;
      return newState;
    });
  };

  const onSubmitHandler = async () => {
    try {
      if (loginData.email === "" || loginData.password === "") {
        seterror("Wrong password or id please check");
        return;
      }
      setloader(true);

      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // if (!res.ok) {
      //   setloader(false);
      // }

      const data = await res.json();

      if (data.status === 400) {
        const err = new Error("Wrong password or id please check");
        throw err;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);

      const userLoginData = {
        isAuth: true,
        token: data.token,
        userId: data.userId,
      };

      dispatch(getUserLoginData(userLoginData));

      navigate("/feed");
    } catch (err) {
      seterror("Wrong password or id please check");
      setloader(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-heading">
        <p>Log in to Facebook</p>
        {error && (
          <p style={{ fontSize: "10px", color: "red", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </div>
      <div className="login-input">
        <input
          type="text"
          name="email"
          id=""
          placeholder="Email address"
          ref={emailRef}
          onChange={() => getLoginData("email", emailRef)}
        />
        <input
          type="password"
          name="password"
          id=""
          placeholder="Password"
          ref={passRef}
          onChange={() => getLoginData("password", passRef)}
        />
      </div>
      <div className="login-btn">
        <button
          onClick={onSubmitHandler}
          style={{ padding: `${!loader ? "15px 0" : "0"}` }}
        >
          <div className="btn-text"> Log in</div>
          {loader && <Loader login={loader} />}
        </button>
      </div>
      <div className="login-links">
        <a href=""> Forgotten account?</a>
        <NavLink to={"/signup"}> Signup For Facebook</NavLink>
      </div>
    </div>
  );
};
