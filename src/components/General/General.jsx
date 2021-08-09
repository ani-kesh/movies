import React, { useState, useEffect } from "react";
import { useLocation, Switch, Route, useHistory } from "react-router-dom";
import { Routes } from "../../constants/router";
import { searchMovie } from "../../data/movies.data";
import { setItems } from "../../helpers/localStorage";
import Nav from "../Nav/Nav";
import Movies from "../Movies/Movies";

export default function General() {
  let history = useHistory();
  const location = useLocation();

  const [searchResult, setSearchResult] = useState([]);
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(location.pathname);
  }, [location]);

  const handleSearch = (ev) => {
    let mounted = true;
    if (ev.target.value.trim !== "") {
      searchMovie(ev.target.value).then((result) => {
        if (mounted) {
          setSearchResult(result);
        }
      });
    }

    return function cleanup() {
      mounted = false;
    };
  };

  const handleLogOut = () => {
    setItems("isAuth", false);
    setItems("currentUser", "");
    history.push("/login");
  };

  return (
    <>
      {pathname.includes("login") ? (
        <></>
      ) : (
        <Nav search={handleSearch} logOut={handleLogOut} />
      )}

      <Switch>
        {Object.values(Routes).map((fn) => {
          const { path, component } = fn();

          return path.includes("/movies") ? (
            <Route
              exact
              path={path}
              component={() => <Movies searchResult={searchResult} />}
              key={Math.random()}
            />
          ) : (
            <Route
              exact
              path={path}
              component={component}
              key={Math.random()}
            />
          );
        })}
      </Switch>
    </>
  );
}
