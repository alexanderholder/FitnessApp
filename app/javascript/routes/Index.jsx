// @flow
import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Home from "../Home"
import ErrorBoundry from "../ErrorBoundry"

export default (
  <ErrorBoundry>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/workouts" exact component={Home} />
      </Switch>
    </Router>
  </ErrorBoundry>
);