// @ts-nocheck
import React, { useContext, useState, useEffect } from "react";
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

    const [test, setTest] = useState(false)

    console.log('title', description)
    /*  placeholder="Choose a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}*/

    // <MyStyledInput />
    return (<Wrapper >
        <button onClick={() => setTest(!test)}></button>

        <input placeholder="Choose a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}></input>

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
