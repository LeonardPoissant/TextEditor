import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

import GitHubLogo from "../Assets/GitHub-Logos/GitHub_Logo.png";
import LinkedInLogo from "../Assets/LI-In-Bug.png";

import logo from "../Assets/logo.png";

const Footer = () => {
  return (
    <Wrapper>
      <FooterContent>
        <LinkToPagesWrapper>
          <LinkToPages to={"/"}>Home</LinkToPages>
          <LinkToPages to={"/Editor"}>Editor</LinkToPages>
          <LinkToPages to={"/About"}>About</LinkToPages>
        </LinkToPagesWrapper>
        <Image src={logo} width={"15%"} height={"5%"} />
        <LinksToSocial>
          <LinkTo href="https://github.com/LeonardPoissant">
            <Logo src={GitHubLogo} width={"65%"}></Logo>
          </LinkTo>
          <LinkTo href="https://www.linkedin.com/in/leonardpoissant/">
            <Logo src={LinkedInLogo} width={"30%"}></Logo>
          </LinkTo>
          <div>leonardtati@gmail.com</div>
        </LinksToSocial>
      </FooterContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  

  border-top-style: solid;
  border-width: 1px;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  margin-top: 30px;
  padding: 10px;
`;

const Logo = styled.img``;

const LinkTo = styled.a`
  width: 100px;
`;

const LinksToSocial = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  padding-left: 15px;
`;

const LinkToPagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  margin-top: 19px;
`;

const LinkToPages = styled(Link)`
  text-decoration: none;
  color: black;
  padding: 2px;
`;
export default Footer;
