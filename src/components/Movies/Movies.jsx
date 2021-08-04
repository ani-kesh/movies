import styles from "./Movies.module.css";
import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getMovies, getMoviePosterURL, getGenre } from "../../data/movies.data";
import { getItems, setItems } from "../../helpers/localStorage";
import { Routes } from "../../constants/router";
import { Bookmark, Minus } from "../Icons";
import { EmptyCoverPicture } from "../Pictures";
// import useScrollPosition from "@react-hook/window-scroll";

let classNames = require("classnames");

const container = classNames({
  flex: true,
  "flex-wrap": true,
  "w-full": true,
  "justify-center": true,
  "bg-purple-800": true,
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
export default function Movies({ searchResult }) {
  let history = useHistory();
  // const scrollY = useScrollPosition(60);
  const [page] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  // const [animation, setAnimation] = useState(false);
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
    typeof searchResult !== "undefined" &&
    typeof searchResult.results !== "undefined" &&
    searchResult.results.length > 0
      ? setMovies(searchResult.results)
      : setMovies(allMovies);
  }, [searchResult, movies, allMovies]);

  useEffect(() => {
    setIsAuth(Boolean(getItems("isAuth")));
  }, []);

  useEffect(() => {
    getMovies(page).then((result) => {
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
        setAllMovies([...movies]);
      });
    });
  }, [page]);

  const handleIsBookmark = (id) => (ev) => {
    ev.stopPropagation();
    const favMovies =
      getItems("favoriteMovies") !== null ? getItems("favoriteMovies") : [];

    if (id !== "") {
      if (favMovies.length > 0) {
        const currentUserFav = favMovies.filter((el) => {
          return el.userId === currentUser;
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
        setItems("favoriteMovies", [
          { userId: currentUser, movieIds: [id], movies },
        ]);
        setFavoriteMovies([{ userId: currentUser, movieIds: [id] }]);
      }
    }
  };

  const handleMovie = (id) => (ev) => {
    ev.stopPropagation();
    history.push(Routes.movie(id).path);
  };

  return isAuth ? (
    <div>
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
    </div>
  ) : (
    <Redirect to={Routes.login().path} />
  );
}
