import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import styled from "styled-components";

import TextEditor from "./Editor";
import Preview from "./Output";
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";
import Profile from "./Profile";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/Editor">
          <TextEditor />
        </Route>
        <Route path="/Output" component={Preview}></Route>
        <Route path="/Profile">
          <Profile />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

const Wrapper = styled.div``;

export default App;
