import React, { useState, useEffect } from "react"; //
import { getMovies, getMoviePosterURL, getGenre } from "../data/movies.data";
// import Nav from "./Nav";
import {Bookmark,Minus} from "./Icons";
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
const topDiv = classNames(["absolute", "top-0", "bg-green-900"]);
const bottomDiv = classNames(["absolute", "bottom-0", "bg-blue-900"]);

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
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

  return (
    <>
      <div className={container}>
        {movies.map((el) => {
          //console.log(el);
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
                <Bookmark/>
                <Minus/>
              </div>
              <div
                className={`${bottomDiv} ${
                  animation
                    ? `${animationStyle} ${animationBottom}`
                    : `${animationStyle} ${animationBottom}`
                }`}
              >
                {typeof el.title !== "undefined" ? el.title : ""}
                {typeof el.genre_ids !== "undefined"
                  ? el.genre_ids.map((el) => {
                      return <span key={Math.random()}>{el}</span>;
                    })
                  : ""}
              </div>
              <img src={`${getMoviePosterURL()}${el.poster_path}`} alt="" />
            </div>
          );
        })}
      </div>
    </>
  );
}
