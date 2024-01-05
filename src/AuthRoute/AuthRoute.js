import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthVerify = (props) => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("access-token");

    if (user) {
      var decodedJwt = jwtDecode(user);
      var dateNow = new Date();
      console.log(decodedJwt);
      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    } else {
      navigate("/login");
    }
  }, [location, props]);

  return <>{props.children}</>;
};

export default AuthVerify;
