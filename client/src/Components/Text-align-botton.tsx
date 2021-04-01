//@ts-nocheck

import React from "react";

import styled from "styled-components";


import textAlignments from "../Utils/InlineStyles/Text-align"

import Button from "./Button"



const TextAlignButtons = (props) => {
    console.log(props)

    return (<div>

        {textAlignments.map(textStyle => (
            <Button label={textStyle.label} onClick={props.onToggle} style={textStyle.style}></Button>
        ))}

    </div>)
}


export default TextAlignButtons
