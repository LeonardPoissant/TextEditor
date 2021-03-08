// @ts-nocheck

import React from "react"

import styled from "styled-components"


const NavigationIcon = (props) => {




    return (<Wrapper onClick={() => props.onClick()}>{props.text}</Wrapper>)
}

export default NavigationIcon


const Wrapper = styled.div`
margin:6px;
cursor: pointer;
`;
