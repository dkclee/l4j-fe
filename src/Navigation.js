import { NavLink } from "react-router-dom";
// import "./Navigation.css";

/** Navigation component to show different dog names
 * 
 * Props:
 * - user
 * 
 * App -> Navigation
 */

function Navigation() {


  return (
    <nav className="Nav navbar navbar-expand-lg navbar-light bg-light">
      <NavLink key="home" exact to="/" className="navbar-brand">Jobly</NavLink>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <NavLink key="companies" exact to="/companies" className="nav-link">Companies</NavLink>
          </li>
          <li class="nav-item">
            <NavLink key="jobs" exact to="/jobs" className="nav-link">Jobs</NavLink>
          </li>
          <li class="nav-item">
            <NavLink key="profile" exact to="/profile" className="nav-link">Profile</NavLink>
          </li>
          <li class="nav-item">
            <button className="nav-link btn btn-link">Logout user</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;