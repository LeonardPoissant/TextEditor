// @ts-nocheck

import React from "react";

import styled from "styled-components"


const Button = (props) => {

    console.log(props.style)

    return (<Wrapper onMouseDown={(e) => props.onClick(e, props.style)}>{props.label}</Wrapper>)
}


const Wrapper = styled.button``;

export default Button;