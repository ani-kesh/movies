import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getMoviePosterURL } from "../../data/movies.data";
import { getItems, setItems } from "../../helpers/localStorage";
import { Routes } from "../../constants/router";
import { Minus } from "../Icons/Icons";
import { EmptyCoverPicture } from "../Pictures/Pictures";
import styles from "./Favorite.module.css";

let classNames = require("classnames");

const container = classNames({
  flex: true,
  "flex-wrap": true,
  "w-full": true,
  "justify-center": true,
  "bg-indigo-900": true,
  "min-h-screen": true,
});

const title = classNames([
  "w-full",
  "flex",
  "flex-wrap",
  "content-between",
  "justify-center",
  "text-white",
  "text-center",
  "text-lg",
  "font-semibold",
]);

const genres = classNames([
  "w-full",
  "flex",
  "flex-wrap",
  "justify-center",
  "text-center",
  "text-xs",
  "font-lg",
]);

const genreItem = classNames([
  "m-1",
  "px-2",
  "py-0.5",
  "rounded-lg",
  "bg-gray-700",
  "font-medium",
  "text-white",
]);

export default function Favorite() {
  let history = useHistory();
  const [movies, setMovies] = useState([]);
  const [isAuth, setIsAuth] = useState(Boolean(getItems("isAuth")));
  const [currentUser] = useState(getItems("currentUser"));
  const [allFavorites, setAllFavorites] = useState([]);

  useEffect(() => {
    setIsAuth(Boolean(getItems("isAuth")));
  }, []);

  useEffect(() => {
    let favoriteMovies =
      getItems("favoriteMovies") !== null ? getItems("favoriteMovies") : [];
    setAllFavorites(favoriteMovies);
    const currentUserFav = favoriteMovies.filter((el) => {
      return el.userId === currentUser;
    });

    if (
      currentUserFav.length > 0 &&
      typeof currentUserFav[0].movieIds !== "undefined"
    ) {
      const favoriteMovieObjs = currentUserFav[0].movieIds;

      setMovies(Object.values(favoriteMovieObjs));
      console.log("firstMovies=", Object.values(favoriteMovieObjs));
    }
  }, [currentUser]);

  const handleIsBookmark = (el) => (ev) => {
    ev.stopPropagation();

    const id = el.id;
    if (id !== "" && allFavorites.length > 0) {
      const newFavoriteMovies = allFavorites.map((elem) => {
        if (elem.userId === currentUser) {
          if (typeof elem.movieIds !== "undefined") {
            if (Object.keys(elem.movieIds).includes(String(id))) {
              delete elem.movieIds[id];
            }
          }
          setMovies(Object.values(elem.movieIds));
          return { ...elem, movieIds: { ...elem.movieIds } };
        }
        return elem;
      });

      console.log(newFavoriteMovies);
      // setMovies()
      setItems("favoriteMovies", newFavoriteMovies);
    }
  };

  const handleMovie = (id) => (ev) => {
    ev.stopPropagation();
    history.push(Routes.movie(id).path);
  };

  return isAuth ? (
    <>
      <div className={container}>
        {movies.length > 0 ? (
          movies.map((el) => {
            return (
              <div
                key={Math.random()}
                className={styles.movie}
                onClick={handleMovie(el.id)}
              >
                <div className={styles.bookmark}>
                  <div onClick={handleIsBookmark(el)}>
                    <Minus id={el.id} />
                  </div>
                </div>

                <div className={styles.about}>
                  <div className={title}>
                    {typeof el.title !== "undefined" ? el.title : ""}

                    <div className={genres}>
                      {typeof el.genre_ids !== "undefined"
                        ? el.genre_ids.map((el) => {
                            return (
                              <div className={genreItem} key={Math.random()}>
                                {el}
                              </div>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                </div>
                {el.poster_path !== null ? (
                  <img
                    src={`${getMoviePosterURL()}${el.poster_path}`}
                    alt={el.title}
                  />
                ) : (
                  <EmptyCoverPicture />
                )}
              </div>
            );
          })
        ) : (
          <></>
        )}
      </div>
    </>
  ) : (
    <Redirect to={Routes.login().path} />
  );
}
