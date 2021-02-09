// @ts-nocheck

import React from "react";

import Posts from "./Posts"

import styled from "styled-components";


//find better name
const BlogHomePage = () => {

    return (
        <Wrapper className="bloghomepage"><Posts /></Wrapper>
    )
}

export default BlogHomePage;

const Wrapper = styled.div`
height:60vh;

`;

