// @ts-nocheck
import React, { useContext, useState } from "react";
import { EditorContext } from "./Contexts/EditorContext";

import styled from "styled-components";

const PostDetails = () => {
    const {
        title,
        setTitle,
        description,
        setDescription,
        setCategory
    } = useContext(EditorContext);

    return (<Wrapper className="postdetails-wrapper">

        <input
            placeholder="Choose a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}

        ></input>

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


    </Wrapper>)
};

export default PostDetails;

const Wrapper = styled.div``;
