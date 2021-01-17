import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './Homepage.js';
import MyStuff from './MyStuff';
import MyResume from './MyResume';
import MyContact from './MyContact';
export default function App() {
  return (
    <Router basename="/PW">
        <Switch>
        <Route exact path = "/">
          <Home/>
        </Route>
        <Route path = "/MyStuff">
          <MyStuff/>
        </Route>
          <Route path = "/MyResume">
            <MyResume/>
            </Route>
          <Route path = "/MyContact">
            <MyContact/>
            </Route>
        </Switch>
    </Router>
    
  );
}