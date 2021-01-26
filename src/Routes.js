import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Homepage from "./Homepage";
import Companies from "./Companies";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

function Routes() {
  return (
    <Switch>
      <Route exact path="/"><Homepage /></Route>
      <Route exact path="/companies"><Companies /></Route>
      <Route exact path="/companies/:handle"><CompanyDetail /></Route>
      <Route exact path="/jobs"><JobList /></Route>
      <Route exact path="/login"><LoginForm /></Route>
      <Route exact path="/signup"><SignupForm /></Route>
      <Route exact path="/profile"><ProfileForm /></Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;