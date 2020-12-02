import React from "react";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import TextEditor from "./Editor";
import Preview from "./Preview";
import HomePage from "./HomePage";
import Header from "./Header";
import Posts from "./Posts"
import Footer from "./Footer";
import Profile from "./Profile";
import About from "./About";
import SideMenu from "./SideMenu";



import Test from "./Test";
const  App =() =>{
  
  return (
    <BrowserRouter>
      <Header />
      <SideMenu/>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="/Editor" >
          <TextEditor/>
        </Route>
        <Route path="/Posts" component={Posts}></Route>
        <Route path="/Preview" component={Preview}></Route>
        <Route path="/Profile">
          <Profile />
        </Route>
        <Route path="/About">
          <About />

        </Route>
        <Route path="/test">
          <Test/>

        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
