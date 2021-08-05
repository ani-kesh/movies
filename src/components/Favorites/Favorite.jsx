import styles from "./Favorite.module.css";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getMovies, getMoviePosterURL, getGenre } from "../../data/movies.data";
import { getItems, setItems } from "../../helpers/localStorage";
import { Routes } from "../../constants/router";
import { Bookmark, Minus } from "../Icons";
import { EmptyCoverPicture } from "../Pictures";
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
  const [favoriteMovies, setFavoriteMovies] = useState(
    getItems("favoriteMovies") !== null ? getItems("favoriteMovies") : []
  );
  const [currentUserFavMovies, setCurrentUserFavMovies] = useState([]);

  useEffect(() => {
    const favMovies = favoriteMovies.length > 0 ? favoriteMovies : [];
    const currentUserFav = favMovies.filter((el) => {
      return el.userId === currentUser;
    });

    setCurrentUserFavMovies(
      currentUserFav.length > 0 ? currentUserFav[0].movieIds : []
    );
  }, [favoriteMovies, currentUser]);

  useEffect(() => {
    let mounted = true;
    setIsAuth(Boolean(getItems("isAuth")));
    getMovies().then((result) => {
      getGenre().then((res) => {
        const movies = result.results.map((el) => {
          if (typeof el.genre_ids !== "undefined") {
            let genreNames = el.genre_ids.map((elem) => {
              let name = res.genres.filter((el) => {
                return elem === el.id;
              });
              return name[0].name;
            });
            return { ...el, genre_ids: [...genreNames] };
          }
          return el;
        });
        let favMovies = currentUserFavMovies.map((el) => {
          const favMovie = movies.filter((elem) => {
            return Number(el) === Number(elem.id);
          });

          return favMovie[0];
        });
        if (mounted) {
          setMovies([...favMovies]);
        }
      });
    });

    return function cleanup() {
      mounted = false;
    };
  }, [currentUserFavMovies]);

  const handleIsBookmark = (id) => (ev) => {
    ev.stopPropagation();
    const favMovies =
      getItems("favoriteMovies") !== null ? getItems("favoriteMovies") : [];

    if (id !== "") {
      if (favMovies.length > 0) {
        const currentUserFav = favMovies.filter((el) => {
          return String(el.userId) === String(currentUser);
        });
        if (currentUserFav.length > 0) {
          let favIds = currentUserFav[0].movieIds;
          let updatedFavIds = [];
          if (favIds.includes(id)) {
            updatedFavIds = favIds.filter((el) => {
              return Number(id) !== Number(el);
            });
          } else {
            updatedFavIds = [...favIds, id];
          }
          let updatedFavMovies = favMovies.map((el) => {
            if (String(el.userId) === String(currentUser)) {
              return { userId: currentUser, movieIds: updatedFavIds };
            }
            return el;
          });
          setItems("favoriteMovies", updatedFavMovies);
          setFavoriteMovies(updatedFavMovies);
        } else {
          setItems("favoriteMovies", [
            ...favMovies,
            { userId: currentUser, movieIds: [id] },
          ]);
          setFavoriteMovies([
            ...favMovies,
            { userId: currentUser, movieIds: [id] },
          ]);
        }
      } else {
        setItems("favoriteMovies", [{ userId: currentUser, movieIds: [id] }]);
        setFavoriteMovies([{ userId: currentUser, movieIds: [id] }]);
      }
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
                  {currentUserFavMovies.some((elem) => {
                    return Number(elem) === Number(el.id);
                  }) ? (
                    <div onClick={handleIsBookmark(el.id)}>
                      <Minus id={el.id} />
                    </div>
                  ) : (
                    <div onClick={handleIsBookmark(el.id)}>
                      <Bookmark id={el.id} />
                    </div>
                  )}
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
