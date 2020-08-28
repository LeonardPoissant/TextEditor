import React from "react";

import styled from "styled-components";

const HomePage = () => {
  return (
    <Wrapper>
      <HomePageBody>
        <p>
          Hi! Welcome to Littera Clip, a blog editor created with the draft.js
          framework.
        </p>
        <p>
          Feel free to hop in the about section to learn more about this
          project!
        </p>
      </HomePageBody>
    </Wrapper>
  );
};

const HomePageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
`;

export default HomePage;
