import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";

import OutsideMenuClick from "./Utils/ComponentsUtils";

import useVisible from "./Utils/ComponentsUtils";

const DropDown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { ref, isVisible, setIsVisible } = useVisible(false);

  console.log(isVisible);

  return (
    <Wrapper>
      <Menu ref={ref} onClick={(e) => setIsVisible(!isVisible)}>
        <MenuIcon />
        {isVisible ? (
          <MenuList>
            <MenuItem onClick={(e) => setIsVisible(!isVisible)}>
              <LinkTo to={"/"}>Home</LinkTo>
            </MenuItem>
            <MenuItem onClick={(e) => setIsVisible(!isVisible)}>
              <LinkTo to={"/Editor"}>Editor</LinkTo>
            </MenuItem>
            <MenuItem>
              <LinkTo to={"/Editor"}>Editor</LinkTo>
            </MenuItem>
            <MenuItem>
              <LinkTo to={"/Editor"}>Editor</LinkTo>
            </MenuItem>
            <MenuItem>
              <LinkTo to={"/Editor"}>Editor</LinkTo>
            </MenuItem>
          </MenuList>
        ) : (
          <></>
        )}
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.button`
  margin: 0px;
  border: none;
  background-color: white;
  outline: none;
`;

const MenuList = styled.ul`
  list-style: none;

  float: left;
  padding-top: 25px;
  margin: 0px;

  border-style: solid;
`;

const MenuItem = styled.li``;

const LinkTo = styled(Link)`
  text-decoration: none;
  color: black;
`;
export default DropDown;
