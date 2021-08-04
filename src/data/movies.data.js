

export const getMovies = async function (page) {
  const url =
    `https://api.themoviedb.org/3/movie/popular?api_key=09b5972df529ea2bd75744e6bf6f9a32&language=en-US&page=${page}`;
  
    return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};

export const getMoviePosterURL = () => "https://image.tmdb.org/t/p/w200";
export const getMoviePosterURLFor400 = () => "https://image.tmdb.org/t/p/w400";

export const getGenre = async function () {
  const url =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=09b5972df529ea2bd75744e6bf6f9a32&language=en-US";
  return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};



export const searchMovie = async function (val) {
  const url =
    `https://api.themoviedb.org/3/search/movie?api_key=09b5972df529ea2bd75744e6bf6f9a32&query=${val}`;
  
    return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};



export const getMovieById = async function (id) {
  const url =
    `https://api.themoviedb.org/3/movie/${id}?api_key=09b5972df529ea2bd75744e6bf6f9a32&language=en-US`;
  
    return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};