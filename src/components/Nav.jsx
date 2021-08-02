import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Routes } from "../constants/router";
let classNames = require("classnames");

const nav = classNames({ "bg-yellow-600": true, block: true });
const navDesktop = classNames([
  "max-w-7xl",
  "mx-auto",
  "px-2",
  "sm:px-6",
  "lg:px-8",
]);
const navButtons = classNames([
  "relative",
  "flex",
  "items-center",
  "justify-between",
  "h-16",
]);
const navButtonsMenu = classNames([
  "flex-1",
  "flex",
  "items-center",
  "justify-center",
  "sm:items-stretch",
  "sm:justify-start",
]);
const navButtonLogo = classNames([
  "flex-shrink-0",
  "flex",
  "items-center",
  "text-white",
]);
const navButtonsRouter = classNames(["hidden", "sm:block", "sm:ml-6"]);


export default function Nav() {

  return (
    <Router>   
      <nav className={nav}>
        <div className={navDesktop}>
          <div className={navButtons}>
            <div className={navButtonsMenu}>
              <div className={navButtonLogo}>{``}</div>
              <div className={navButtonsRouter}>
                <div className="flex space-x-4">
                  {Object.values(Routes).map((fn) => {
                    const { path, text } = fn();
                     return path.includes("favorite") || path.includes("movies") ? (
                     <Link
                        to={path}
                        key={Math.random()}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {text}
                      </Link>
                    ) 
                    : (
                      <span key={Math.random()}></span>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="bg-gray-800 flex text-sm p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* <a
              href="#"
              className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Calendar
            </a> */}
          </div>
        </div>
      </nav>

      <Switch>
              {Object.values(Routes).map((fn) => {
                const { path, component } = fn();

                return (
                  <Route
                    exact
                    path={path}
                    component={component}
                    key={Math.random()}
                  />
                );
              })}
            </Switch>
    </Router>
  );
}
