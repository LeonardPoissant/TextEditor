import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import styled from "styled-components";

import TextEditor from "./Editor";
import Preview from "./Output";
import HomePage from "./HomePage";
import Header from "./Header";
import Footer from "./Footer";
function App() {
  return (
    <Wrapper>
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
        </Switch>
        <Footer />
      </BrowserRouter>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-height: 100vh;
`;

export default App;
