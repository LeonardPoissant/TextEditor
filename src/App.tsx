import React from "react";
import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import Editor from "./Editor";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/Editor">
          <Editor />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
