let apiKey = "09b5972df529ea2bd75744e6bf6f9a32";
let mainURL = "https://api.themoviedb.org/3";

export const getMovies = async function (page) {
  const url = `${mainURL}/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;

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
  const url = `${mainURL}/genre/movie/list?api_key=${apiKey}&language=en-US`;
  return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};

export const searchMovie = async function (val) {
  const url = `${mainURL}/search/movie?api_key=${apiKey}&query=${val}`;

  return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};

export const getMovieById = async function (id) {
  const url = `${mainURL}/movie/${id}?api_key=${apiKey}&language=en-US`;

  return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};
