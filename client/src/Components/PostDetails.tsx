// @ts-nocheck
import React, { useContext, useState } from "react";
import { EditorContext } from "../Contexts/EditorContext";

import StyledInput from "./Input";
import MetaTags from "./Helmet"
import styled from "styled-components";

const PostDetails = () => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        setCategory
    } = useContext(EditorContext);


    /*  placeholder="Choose a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}*/

    // <MyStyledInput />
    return (<Wrapper >
        <StyledInput
            placeholder="Choose a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}


        />

        <textarea
            placeholder="Write a small description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>


        <select onChange={(e) => setCategory(e.target.value)}>
            <option value="coding">coding</option>
            <option value="random">random</option>
        </select>

        <MetaTags title={title} description={description}></MetaTags>

    </Wrapper>)
};

export default PostDetails;

const Wrapper = styled.div`
display:flex;
flex-direction:column;
max-width: 400px;
`;
