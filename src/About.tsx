import React from "react";

import styled from "styled-components";

const About = () => {
  return (
    <Wrapper>
      <p>
        LitteraClip is a little project I made after graduating from the
        Concordia Bootcamp. Being a screenwriter in a previous life, I wanted to
        bridge the gap between creating content and coding...so making a text
        editor was a logical choice.
      </p>
      <p>
        In this first iteration of LitteraClip I focused solely on the text
        editor functionalities, playing with basic styling and embeding
        different media material.
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

export default About;
