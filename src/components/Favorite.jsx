import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { getMovies, getMoviePosterURL, getGenre } from "../data/movies.data";
import { getItems, setItems } from "./../helpers/localStorage";
import { Routes } from "./../constants/router";
import { Bookmark, Minus } from "./Icons";
let classNames = require("classnames");

const container = classNames({
  flex: true,
  "flex-wrap": true,
  "w-full": true,
  "justify-center": true,
});

const movie = classNames(["relative", "m-8"]);

const animationStyle = classNames([
  "w-full",
  "transition-height",
  "duration-500",
  "ease-in-out",
]);
const animationTop = classNames(["h-1/3"]);
const animationBottom = classNames(["h-2/3"]);
const topDiv = classNames([
  "flex",
  "justify-center",
  "items-center",
  "absolute",
  "top-0",
  "bg-indigo-400",
  "bg-opacity-75",
]);
const bottomDiv = classNames([
  "absolute",
  "bottom-0",
  "bg-indigo-600",
  "bg-opacity-75",
  "flex",
  "flex-wrap",
  "content-between",
]);

export default function Favorite() {
  const [movies, setMovies] = useState([]);
  const [animation, setAnimation] = useState(false);
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

        setMovies([...movies]);
      });
    });
  }, []);

  const handleMove = () => {
    setAnimation(true);
  };

  const handleLeave = () => {
    setAnimation(false);
  };

  const handleIsBookmark = (ev) => {
    const favMovies =
      getItems("favoriteMovies") !== null ? getItems("favoriteMovies") : [];
    const id = ev.target.id;

    if (favMovies.length > 0) {
      const currentUserFav = favMovies.filter((el) => {
        return el.userId === currentUser;
      });
      if (currentUserFav.length > 0) {
        let favIds = currentUserFav[0].movieIds;
        let updatedFavIds = [];
        if (favIds.includes(id)) {
          updatedFavIds = favIds.filter((el) => {
            return id !== el;
          });
        } else {
          updatedFavIds = [...favIds, id];
        }
        let updatedFavMovies = favMovies.map((el) => {
          if (el.userId === currentUser) {
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
  };

  return isAuth ? (
    <>
      <div className={container}>
        {movies.map((el) => {
          return (
            <div
              key={Math.random()}
              className={movie}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >
              <div
                className={`${topDiv} ${
                  animation
                    ? `${animationStyle} ${animationTop}`
                    : `${animationStyle} ${animationTop}`
                }`}
              >
                {currentUserFavMovies.some((elem) => {
                  return Number(elem) === Number(el.id);
                }) ? (
                  <Minus handleBookmark={handleIsBookmark} id={el.id} />
                ) : (
                  <Bookmark handleBookmark={handleIsBookmark} id={el.id} />
                )}
              </div>
              <div
                className={`${bottomDiv} ${
                  animation
                    ? `${animationStyle} ${animationBottom}`
                    : `${animationStyle} ${animationBottom}`
                }`}
              >
                <div className="w-full flex flex-wrap justify-center text-white text-center text-lg font-semibold">
                  {typeof el.title !== "undefined" ? el.title : ""}
                </div>

                <div className="w-full overflow-hidden flex flex-wrap justify-center text-center text-xs font-lg">
                  {typeof el.genre_ids !== "undefined"
                    ? el.genre_ids.map((el) => {
                        return (
                          <div
                            className="m-1 px-2 py-0.5 rounded-lg bg-gray-700 font-medium text-white"
                            key={Math.random()}
                          >
                            {el}
                          </div>
                        );
                      })
                    : ""}
                </div>
              </div>
              <img src={`${getMoviePosterURL()}${el.poster_path}`} alt="" />
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <Redirect to={Routes.login().path} />
  );
}
