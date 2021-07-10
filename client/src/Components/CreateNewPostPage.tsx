// @ts-nocheck

import React, { useEffect, useContext } from "react";

import TextEditor from "./Editor";
import PostDetails from "./PostDetails";
import { EditorContext } from "../Contexts/EditorContext";

import styled from "styled-components"

const CreateNewPost = () => {
    const {
        postArticle,
    } = useContext(EditorContext);

    return (
        <Wrapper onSubmit={(e) => postArticle(e)} >
            <div></div>
            <TextEditor />
            <PostDetails />
        </Wrapper>)
};

const Wrapper = styled.div`
display:flex;
justify-content: space-between;
`;


export default CreateNewPost;