import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuIcon from "@material-ui/icons/Menu";

import OutsideMenuClick from "./Utils/ComponentsUtils";

import useVisible from "./Utils/ComponentsUtils";

const DropDown = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { ref, isVisible, setIsVisible } = useVisible(false);

  return (
    <Wrapper>
      <Menu ref={ref} onClick={(e) => setIsVisible(!isVisible)}>
        <MenuIcon />
      </Menu>
      {isVisible ? (
        <MenuList>
          <MenuItem onClick={(e) => setIsVisible(!isVisible)}>
            <LinkTo to={"/"}>Home</LinkTo>
          </MenuItem>
          <MenuItem onClick={(e) => setIsVisible(!isVisible)}>
            <LinkTo to={"/Editor"}>Editor</LinkTo>
          </MenuItem>
          <MenuItem onClick={(e) => setIsVisible(!isVisible)}>
            <LinkTo to={"/Profile"}>Profile</LinkTo>
          </MenuItem>
        </MenuList>
      ) : (
        <></>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const Menu = styled.button`
  margin: 0px;
  border: none;
  background-color: white;
  outline: none;
`;

const MenuList = styled.ul`
  list-style: none;
  position: absolute;
  padding: 0px;
  margin: 0px;
  z-index: 1000;
  border-style: solid;
  border-width: 1px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuItem = styled.li`
  padding: 6px;
`;

const LinkTo = styled(Link)`
  text-decoration: none;
  color: black;
`;
export default DropDown;
