import styles from "./Movies.module.css";
import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isAuth, setIsAuth] = useState(Boolean(getItems("isAuth")));
  const [currentUser] = useState(getItems("currentUser"));
  const [favoriteMovies, setFavoriteMovies] = useState(
    getItems("favoriteMovies") !== null ? getItems("favoriteMovies") : []
  );
  const [currentUserFavMovies, setCurrentUserFavMovies] = useState([]);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const observer = useRef();
  const lastMovieElRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && totalPages >= page + 1) {
          setPage(page + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, page, totalPages]
  );

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
    let mounted = true;
    getMovies(page).then((result) => {
      getGenre().then((res) => {
        if (typeof result.results !== "undefined") {
          const newMovies = result.results.map((el) => {
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
          if (mounted) {
            setHasMore(result.results.length > 0);
            setMovies((movies) => [...movies, ...newMovies]);
            setAllMovies((movies) => [...movies, ...newMovies]);
            setTotalPages(result.total_pages);
          }
        }
      });
    });

    return function cleanup() {
      mounted = false;
    };
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
          movies.map((el, index) => {
            if (movies.length === index + 1) {
              return (
                <div
                  ref={lastMovieElRef}
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
            } else {
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
            }
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
