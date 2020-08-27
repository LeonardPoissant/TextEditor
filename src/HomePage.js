import React from "react";

import Header from "./Header";

import Link from "react-router-dom";

import Footer from "./Footer";

import styled from "styled-components";

const HomePage = () => {
  return (
    <Wrapper>
      <HomePageBody>THIS IS MY HOMEPAGE</HomePageBody>
    </Wrapper>
  );
};

const HomePageBody = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default HomePage;
