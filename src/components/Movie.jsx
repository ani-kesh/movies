import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getMovieById, getMoviePosterURLFor400 } from "./../data/movies.data";
import { getItems } from "../helpers/localStorage";
import { Routes } from "../constants/router";
import {EmptyCoverPicture} from "./Pictures";
let classNames = require("classnames");

const container = classNames(["p-20", "min-h-screen", "bg-indigo-900"]);
const cardContainer = classNames([
  "max-w-md",
  "mx-auto",
  "bg-gray-200",
  "rounded-xl",
  "shadow-md",
  "overflow-hidden",
  "md:max-w-2xl",
]);

const imgContainer = classNames(["md:flex-shrink-0"]);
const img = classNames(["h-96", "w-full", "object-cover", "md:w-48"]);
const title = classNames([
  "uppercase",
  "tracking-wide",
  "text-lg",
  "text-indigo-500",
  "font-semibold",
]);
const overview = classNames(["mt-2", "text-gray-500"]);
const releaseDate = classNames(["mt-10", "text-blue-500"]);
const card = classNames(["md:flex"]);
const about = classNames(["p-8"]);

export default function Movie(props) {
  const [movieId] = useState(props.match.params.movieId);
  const [movieInfo, setMovieInfo] = useState(props.match.params.movieId);
  const [isAuth, setIsAuth] = useState(Boolean(getItems("isAuth")));

  useEffect(() => {
    setIsAuth(Boolean(getItems("isAuth")));
  }, []);

  useEffect(() => {
    let mounted = true;
    getMovieById(movieId).then((res) => {
      if (mounted) {
        setMovieInfo(res);
      }
    });

    return function cleanup() {
      mounted = false;
    };
  }, [movieId]);

  return isAuth ? (
    <div className={container}>
      <div className={cardContainer}>
        <div className={card}>
          <div className={imgContainer}>
            {typeof movieInfo.poster_path !== "undefined" &&
            movieInfo.poster_path !== null ? (
              <img
                className={img}
                src={`${getMoviePosterURLFor400()}${movieInfo.poster_path}`}
                alt={movieInfo.title}
              />
            ) : (
              <EmptyCoverPicture/>
            )}
          </div>
          <div className={about}>
            <div className={title}>{movieInfo.title}</div>

            <p className={overview}>{movieInfo.overview}</p>

            <p className={releaseDate}>
              Release Date: {movieInfo.release_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Redirect to={Routes.login().path} />
  );
}
