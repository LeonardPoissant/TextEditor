// @ts-nocheck

import React, { useEffect } from "react";

import TextEditor from "./Editor";
import PostDetails from "./PostDetails";
import ColorIconDropDown from "./Color-Icon-Dropdown"

import styled from "styled-components"

const CreateNewPost = () => {

    return (
        <Wrapper>
            <div></div>
            <TextEditor />
            <PostDetails />
        </Wrapper>)
};

const Wrapper = styled.div`
display:flex;
justify-content: space-around;
`;


export default CreateNewPost;