// @ts-nocheck

import React from "react";

import Posts from "./Posts"

import styled from "styled-components";
import BlogNavigation from "./BlogNavigation/BlogNavigation"


//find better name
const BlogHomePage = () => {

    return (
        <Wrapper className="bloghomepage">

            <Posts />
            <BlogNavigation />




        </Wrapper>
    )
}

export default BlogHomePage;

const Wrapper = styled.div`

display:flex;
justify-content:space-around;
flex-direction:column;
align-items:center; 

padding:20px;



`;




