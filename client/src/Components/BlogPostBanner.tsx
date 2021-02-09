// @ts-nocheck

import React from "react";

import styled from "styled-components";

//add image per cat

const BlogPostBanner = (props) => {

    console.log('IN BANNER', props)


    return (
        <Wrapper>

            <div>I AM AN IMAGE</div>
            <DetailsContainer>
                <div>{props.title}</div>
                <div>{props.description}</div>
                <SubContainer>
                    <div>{props.category}</div>
                    <div>{props.date}</div>
                </SubContainer>
            </DetailsContainer>
        </Wrapper>)
};

export default BlogPostBanner;



const Wrapper = styled.div`
display:flex;
border-bottom: solid black;
justify-content:center;
align-items:center;
width:800px;
margin-right:0px;

`;

const DetailsContainer = styled.div`
display:flex;
flex-direction: column;
`;

const SubContainer = styled.div`
display:flex;
align-items:flex-end;
justify-content:space-between;

`;

