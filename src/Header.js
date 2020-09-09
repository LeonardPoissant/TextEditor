import React from "react";

import styled from "styled-components";

import DropDown from "./DropDown";

const Header = () => {
  return (
    <>
      <Wrapper>
        <DropDown />
        <Title>Littera Clip</Title>
        <div></div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;

  align-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Title = styled.h1`
  font-family: Snell Roundhand, cursive;
  margin: 0px;
`;

export default Header;
