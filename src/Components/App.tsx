import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import TextEditor from "./Editor";
import Preview from "./Preview";
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
import About from "./About";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/Editor" component={TextEditor}></Route>
        <Route path="/Preview" component={Preview}></Route>
        <Route path="/Profile">
          <Profile />
        </Route>
        <Route path="/About">
          <About />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
