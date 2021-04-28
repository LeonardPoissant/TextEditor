import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import TextEditor from "./Editor";
import Preview from "./Preview";
import HomePage from "./HomePage";
import Header from "./Header";
import Posts from "./BlogHomePage/Posts"
import Footer from "./Footer";
import Profile from "./Profile";
import About from "./About";
import SideMenu from "./SideMenu";
import BlogPostPage from "./BlogPostPage";
import CreateNewPost from "./CreateNewPostPage"


import Test from "./Test";
import BlogHomePage from "./BlogHomePage/BlogHomePage";
const App = () => {

  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/Editor" >
          <CreateNewPost />
        </Route>
        <Route path="/Posts/:page" component={BlogHomePage}></Route>
        <Route path="/Preview" component={Preview}></Route>
        <Route path="/Profile">
          <Profile />
        </Route>

        <Route path="/Post/:id/:title" component={BlogPostPage}></Route>
        <Route path="/About">
          <About />
        </Route>
        <Route path="/test">
          <Test />

        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
