import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from './Routes';
import Navigation from './Navigation';

import userContext from "./userContext";

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

  /** Update the user state upon mount and when the token changes */
  useEffect(function updateUserOnChange() {
    async function updateUser() {
      try {
        JoblyApi.token = token;
        let {username} = jwt.decode(token);
        let user = await JoblyApi.getUser(username);
        setCurrentUser(user);
      } catch (err) {
        // Maybe we want to let the user know what the error was
        // and redirect to some error page or ask the user to 
        // retry the login
        // Redirect and perhaps use the location object to hold
        // an error message
        console.error(err);
        // To be extra safe
        setCurrentUser(null);
        return;
      }
    }
    // Want to clear the user so that there isn't a state where
    // token refers to one user and user is another user
    setCurrentUser(null);
    if(token) updateUser();
  }, [token]);

  /** Function called by LoginForm when submitted */
  function login(formData) {
    async function loginUsingApi() {
      try {
        let newToken = await JoblyApi.login(formData);
        setToken(newToken);
        // Perhaps return a different message when you successfully login
        // so that we can display as a separate message
        return null;
      } catch (err) {
        return err;
      }
    }
    return loginUsingApi();
  }

  /** Function called by SignupForm when submitted */
  function signup(formData) {
    async function signupUsingApi() {
      try {
        let newToken = await JoblyApi.signup(formData);
        setToken(newToken);
        // Perhaps return a different message when you successfully login
        // so that we can display as a separate message
        return null;
      } catch (err) {
        return err;
      }
    }
    return signupUsingApi();

  }

  /** Function called by Navigation when logout btn is clicked */
  function logout() {
    setToken(null);
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <userContext.Provider value={currentUser}>
          <Navigation logout={logout} />
          <Routes
            login={login}
            signup={signup}
          />
        </userContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
