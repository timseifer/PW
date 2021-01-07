import React, {useEffect, useRef} from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './App.js';
import MyStuff from './MyStuff';
import MyResume from './MyResume';
import MyContact from './MyContact';
export default function App() {
  return (
    <Router>
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