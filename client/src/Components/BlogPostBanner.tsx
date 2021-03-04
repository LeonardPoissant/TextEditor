// @ts-nocheck

import React from "react";

import styled from "styled-components";

import Logo from "../Assets/logo.png"

const BlogPostBanner = (props) => {




    return (
        <Wrapper>

            <Thumnail src={Logo}></Thumnail>
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

const Thumnail = styled.img`
width:15%;
height:80px;
padding: 15px;

`


