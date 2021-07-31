import React, { useState, useEffect } from "react"; //
import { getMovies, getMoviePosterURL } from "../data/movies.data";
let classNames = require("classnames");

const container = classNames({
  flex: true,
  "flex-wrap": true,
  "w-full": true,
});

export default function Movies() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovies().then((res) => {
      setMovies([...res.results]);
    });
  }, []);

  return (
    <div className={container}>
      {movies.map((el) => {
        console.log(el);
        return (
          <div key={Math.random()}>
            <img src={`${getMoviePosterURL()}${el.poster_path}`} alt="" />
          </div>
        );
      })}
    </div>
  );
}
