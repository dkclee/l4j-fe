import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import Companies from "./companies/Companies";
import CompanyDetail from "./companies/CompanyDetail";
import JobList from "./jobs/JobList";
import LoginForm from "./users/LoginForm";
import SignupForm from "./users/SignupForm";
import ProfileForm from "./users/ProfileForm";

function Routes({ currentUser, login, signup }) {
  return (
    <Switch>
      <Route exact path="/"><Homepage /></Route>
      <Route exact path="/companies"><Companies /></Route>
      <Route exact path="/companies/:handle"><CompanyDetail /></Route>
      <Route exact path="/jobs"><JobList /></Route>
      <Route exact path="/login">
        <LoginForm currentUser={currentUser} login={login} />
      </Route>
      <Route exact path="/signup">
        <SignupForm currentUser={currentUser} signup={signup} />
      </Route>
      <Route exact path="/profile">
        <ProfileForm />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;