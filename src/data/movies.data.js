

export const getMovies = async function () {
  const url =
    "https://api.themoviedb.org/3/movie/popular?api_key=09b5972df529ea2bd75744e6bf6f9a32&language=en-US&page=1";
  
    return await fetch(url)
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      return result;
    });
};

export const getMoviePosterURL = () => "https://image.tmdb.org/t/p/w200";

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
