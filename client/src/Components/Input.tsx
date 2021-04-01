// @ts-nocheck

import React from "react";

import styled from "styled-components";


const StyledInput = (props) => {


    return (
        <Wrapper
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.OnChange}

        ></Wrapper>
    )

}

const Wrapper = styled.input`

margin:24px 0px`;


export default StyledInput;