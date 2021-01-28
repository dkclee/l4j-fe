import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import Companies from "./companies/Companies";
import CompanyDetail from "./companies/CompanyDetail";
import JobList from "./jobs/JobList";
import LoginForm from "./users/LoginForm";
import SignupForm from "./users/SignupForm";
import ProfileForm from "./users/ProfileForm";
import userContext from "./userContext";

function Routes({ login, signup, updateProfile }) {
  const currentUser = useContext(userContext);
  const loginLocation = {
    pathname: "/login",
    state: {
      msg: "You need to be logged in order to view this page"
    }
  }
  return (
    <Switch>
      <Route exact path="/">
        <Homepage />
      </Route>
      <Route exact path="/companies">
        {currentUser ? <Companies /> : <Redirect to={loginLocation} />}
      </Route>
      <Route exact path="/companies/:handle">
        {currentUser ? <CompanyDetail /> : <Redirect to={loginLocation} />}
      </Route>
      <Route exact path="/jobs">
        {currentUser ? <JobList /> : <Redirect to={loginLocation} />}
      </Route>
      <Route exact path="/login">
        <LoginForm login={login} />
      </Route>
      <Route exact path="/signup">
        <SignupForm signup={signup} />
      </Route>
      <Route exact path="/profile">
        {currentUser
          ? <ProfileForm updateProfile={updateProfile} />
          : <Redirect to={loginLocation} />}
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;