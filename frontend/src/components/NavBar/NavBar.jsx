import React, { useState } from "react";
import styles from "./NavBar.module.css";
import logo from "../../images/logo.png";
import { Link, useLocation } from "react-router-dom";

export default function NavBar({ info }) {
  const [nav, setNav] = useState(false);
  const { pathname } = useLocation(); // get the current pathname, like /chat
  const path = pathname.slice(1);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNav(true);
    } else {
      setNav(false);
    }
  };

  window.addEventListener("scroll", changeBackground);
  return (
    <nav className={`${styles.nav} ${nav ? styles.active : ""}`}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="" />
      </Link>
      <ul className={styles.menu}>
        <li>
          <Link className={`${path === "" ? styles.current_path : ""}`} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${path === "about" ? styles.current_path : ""}`}
            to="/about"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            className={`${path === "contact" ? styles.current_path : ""}`}
            to="/contact"
          >
            Contact
          </Link>
        </li>
        {!info && (
          <li>
            <Link
              className={`${path === "login" ? styles.current_path : ""}`}
              to="/login"
            >
              Sign in
            </Link>
          </li>
        )}
        {info && (
          <li>
            <Link
              className={`${path === "me" ? styles.current_path : ""}`}
              to="/me"
            >
              My Profile
            </Link>
          </li>
        )}{info && (
        <li>
          <Link
            className={`${path === "matching" ? styles.current_path : ""}`}
            to="/matching"
          >
            Matching
          </Link>
        </li>
      )}
        {info && (
          <li>
            <Link
              className={`${path === "chat" ? styles.current_path : ""}`}
              to="/chat"
              duration="1000"
            >
              Chat
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
