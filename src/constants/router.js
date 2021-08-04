
import Login from "../components/Login";
import Movies from "../components/Movies/Movies";
import Movie from "../components/Movie";
import Error from "../components/Error";
import Favorite from "../components/Favorites/Favorite";

export const Routes = {
  login: () => ({ path: "/login", text: "Login", component: Login }),
  movies: () => ({
    path: "/movies",
    text: "Best Movies",
    component: Movies,
  }),
  movie: (id=":movieId") => ({
    path: `/movie/${id}`,
    text: "Movie",
    component: Movie,
  }),
  favorite: () => ({
    path: `/favorite`,
    text: "Favorite",
    component: Favorite,
  }),
  error: () => ({ path: "*", text: "Error", component: Error }),
};