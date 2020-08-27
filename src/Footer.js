import React from "react";

import styled from "styled-components";

import logo from "./Assets/logo.png";

const Footer = () => {
  return (
    <Wrapper>
      <img src={logo} width={"20%"} height={"30%"} />{" "}
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
`;

export default Footer;
