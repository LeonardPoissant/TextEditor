// @ts-nocheck

import React from "react";

import styled from "styled-components";

import Logo from "../../Assets/logo.png"

const BlogPostBanner = (props) => {




  return (
    <Wrapper>

      <Thumnail src={Logo}></Thumnail>

      <DetailsContainer>
        <Title>{props.title}</Title>
        <Description>{props.description}</Description>
        <SubContainer>
          <Catgeroy>{props.category}</Catgeroy>
          <CreatedOn>{props.date}</CreatedOn>
        </SubContainer>
      </DetailsContainer>
    </Wrapper>)
};

export default BlogPostBanner;



const Wrapper = styled.div`
display:flex;

justify-content:flex-start;
align-items:center;
width:800px;
height:200px;
margin-right:0px;
text-decoration:none;
color:black;

transition: width 1s, height 1s;
background: /* gradient can be an image */

linear-gradient(0.25turn,#ff4b1f,
    #1fddff)
    left 
    bottom
     
    no-repeat; 
  background-size:100% 2px ;
z-index:-999;
  :hover{
    left: 0;
 
  width:900px;

  height:300px;
   
  z-index: 999;
  }

`;

const DetailsContainer = styled.div`
display:flex;
flex-direction: column;
width:100%;
text-decoration:none;
`;

const SubContainer = styled.div`
display:flex;

justify-content:space-between;
width:100%;

`;

const Thumnail = styled.img`
width:20%;
height:80px;
padding: 15px;

`
const Title = styled.h3`
margin:0px;
`;

const Description = styled.div`
padding: 6px 0px 6px 0px;
`;

const Catgeroy = styled.div`
padding: 6px 0px 6px 0px;
`;

const CreatedOn = styled.div`
padding:3px;
`;




