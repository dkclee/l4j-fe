import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from './Routes';
import Navigation from './Navigation';

import JoblyApi from "./api";

import jwt from "jsonwebtoken";

import './App.css';
import "bootstrap/dist/css/bootstrap.css";

/** Jobly App Component
 * 
 * State:
 * - currentUser: 
 *    null  
 *      OR
 *    { username, firstName, lastName, isAdmin, jobs }
 *    where jobs is { id, title, companyHandle, companyName, state }
 * - token: Token to make AJAX requests
 */

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(function updateUserOnChange() {
    async function updateUser() {
      try {
        JoblyApi.token = token;
        let username = jwt.decode(token).username;
        let user = await JoblyApi.getUser(username);
        setCurrentUser(user);
      } catch (err) {
        // Maybe we want to let the user know what the error was
        // and redirect to some error page or ask the user to 
        // retry the login
        // Redirect and perhaps use the location object to hold
        // an error message
        return;
      }
    }
    if (token) updateUser();
  }, [token]);

  function login(formData) {
    async function loginUsingApi() {
      try {
        let newToken = await JoblyApi.login(formData);
        console.log('inside loginUsingApi', newToken);
        setToken(newToken);
        return null;
      } catch (err) {
        return err;
      }
    }
    return loginUsingApi();
  }

  function signup() { }

  function logout() {
    setToken(null);
    setCurrentUser(null);
  }


  return (
    <div className="App">
      <BrowserRouter>
        <Navigation currentUser={currentUser} logout={logout} />
        <Routes
          currentUser={currentUser}
          login={login}
          signup={signup}
        />
      </BrowserRouter>
    </div>
  );
}

export default App;
