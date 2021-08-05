import React from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import { Routes } from "../constants/router";
let classNames = require("classnames");

const nav = classNames({ "bg-indigo-900": true, block: true });
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
const linkText = classNames([
  "text-gray-300",
  "hover:bg-gray-700",
  "hover:text-white",
  "px-3",
  "py-2",
  "rounded-md",
  "text-sm",
  "font-medium",
]);
const signOutContainer = classNames([
  "absolute",
  "inset-y-0",
  "right-0",
  "flex",
  "items-center",
  "pr-2",
  "sm:static",
  "sm:inset-auto",
  "sm:ml-6",
  "sm:pr-0",
]);

const signOutBtn = classNames([
  "bg-transparent",
  "hover:bg-blue-500",
  "text-gray-200",
  "font-semibold",
  "hover:text-white",
  "py-2",
  "px-4",
  "border",
  "border-gray-200",
  "hover:border-transparent",
  "rounded",
]);

const searchStyle = classNames([
  "bg-purple-600",
  "text-white",
  "w-96",
  "border-none",
  "mr-3",
  "px-2",
  "leading-tight",
  "focus:outline-none",
]);
const navButtonsRouter = classNames(["hidden", "sm:block", "sm:ml-6"]);
const signOut = classNames(["ml-3", "relative"]);

/* mobile styles */

const mobileMenu = classNames(["sm:hidden"]);
const navItem = classNames(["px-2", "pt-2", "pb-3", "space-y-1"]);
const navBtn = classNames([
  "bg-gray-900",
  "text-white",
  "block",
  "px-3",
  "py-2",
  "rounded-md",
  "text-base",
  "font-medium",
]);

export default function Nav({ search, logOut }) {
  return (
    <>
      <nav className={nav}>
        <div className={navDesktop}>
          <div className={navButtons}>
            <div className={navButtonsMenu}>
              <div className={navButtonLogo}>{``}</div>
              <div className={navButtonsRouter}>
                <div className="flex space-x-10">
                  {Object.values(Routes).map((fn) => {
                    const { path, text } = fn();
                    return path.includes("favorite") ||
                      path.includes("movies") ? (
                      <Link to={path} key={Math.random()} className={linkText}>
                        {text}
                      </Link>
                    ) : (
                      <span key={Math.random()}></span>
                    );
                  })}
                  <Input
                    onChange={search}
                    className={searchStyle}
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>
            </div>
            <div className={signOutContainer}>
              <div className={signOut}>
                <div>
                  <button type="button" className={signOutBtn} onClick={logOut}>
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={mobileMenu} id="mobile-menu">
          <div className={navItem}>
            {Object.values(Routes).map((fn) => {
              const { path, text } = fn();
              return path.includes("favorite") || path.includes("movies") ? (
                <Link to={path} key={Math.random()} className={navBtn}>
                  {text}
                </Link>
              ) : (
                <span key={Math.random()}></span>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
