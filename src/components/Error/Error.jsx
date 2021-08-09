import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getItems } from "../../helpers/localStorage";
import { Routes } from "../../constants/router";
import error from "../../data/Error.jpg";

let classNames = require("classnames");

const errorImg = classNames(["w-full"]);

export default function Error() {
  const [isAuth, setIsAuth] = useState(Boolean(getItems("isAuth")));

  useEffect(() => {
    setIsAuth(Boolean(getItems("isAuth")));
  }, []);

  return isAuth ? (
    <>
      <img src={error} className={errorImg} alt="error" />
    </>
  ) : (
    <Redirect to={Routes.login().path} />
  );
}
