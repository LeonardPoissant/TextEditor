import React from "react";

import styled from "styled-components";

import DropDown from "./DropDown";
import { useSelector } from "react-redux";

import { RootState} from "../reducers/firebasereducer";
import Avatar from "./Avatar"

const Header = () => {

  const user = useSelector((state:RootState)=>state.firebase.profile)
 

  return (
    <>
      <Wrapper>
        <DropDown />
        <Title>Pantry</Title>
        <Avatar src={user.avatarUrl}/>
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
