import {useContext} from "react";
import { NavLink } from "react-router-dom";

import userContext from "./userContext";
// import "./Navigation.css";

/** Navigation component to show different dog names
 * 
 * Props:
 * - currentUser
 * 
 * App -> Navigation
 */

function Navigation({ logout }) {
  const currentUser = useContext(userContext);
  let navLinks;

  if (currentUser) {
    navLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink key="companies" exact to="/companies" className="nav-link">Companies</NavLink>
      </li>
      <li className="nav-item">
        <NavLink key="jobs" exact to="/jobs" className="nav-link">Jobs</NavLink>
      </li>
      <li className="nav-item">
        <NavLink key="profile" exact to="/profile" className="nav-link">Profile</NavLink>
      </li>
      <li className="nav-item">
        <button onClick={logout} className="nav-link btn btn-link">Logout {currentUser.username}</button>
      </li>
    </ul>);
  } else {
    navLinks = (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
        <NavLink key="login" exact to="/login" className="nav-link">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink key="signup" exact to="/signup" className="nav-link">Signup</NavLink>
      </li>
    </ul>);
  }

  return (
    <nav className="Nav navbar navbar-expand-lg navbar-light bg-light">
      <NavLink key="home" exact to="/" className="navbar-brand">Jobly</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {navLinks}
      </div>
    </nav>
  );
}

export default Navigation;