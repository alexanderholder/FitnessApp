// @flow
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Calendar from "../components/calendar/Calendar";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Calendar} />
      <Route path="/workouts" exact component={Calendar} />
    </Switch>
  </Router>
);