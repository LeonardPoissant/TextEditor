// @ts-nocheck

import React, { useEffect, useState } from "react";

import fontSizeStyle from "../Utils/InlineStyles/FontSize"
import styled from "styled-components";



const FontSizeDropDown = ({ onToggle }) => {
    const [fontSizes, setFontSizes] = useState([])


    useEffect(() => {
        fontSizeStyle.map(fontsize => {
            setFontSizes(fontSizes.push(fontsize.label.replace('pt', '')))
        })

    }, [])

    console.log(fontSizes)

    return (
        <Wrapper>
            <StyledUl
            >
                {fontSizeStyle.map((fontSize, index) => (
                    <StyledLi
                        key={fontSize.label}
                        value={fontSize.style}
                        index={index}
                        fontSize={fontSize.label.replace('pt', 'px')}
                        onMouseDown={(e) => onToggle(e, fontSize.style)}
                    >{fontSize.label}</StyledLi>
                ))}
            </StyledUl>
        </Wrapper >
    )
}


const Wrapper = styled.div`


margin-left:-463px;

margin-top:47px;

display:flex;
justify-content:center;
align-items:center;
position:absolute;

width:inherit;

`;


const StyledUl = styled.ul`
height:57px;
list-style-type:none;
padding:0px;
display:flex;
justify-content:center;
align-items:center;



margin-right:auto;
margin-left:auto;
overflow:hidden;
`;


const StyledLi = styled.li`
text-decoration:none;
padding:2px;
margin-right:0px;  

:hover{
padding:3px;
font-size: ${props => props.fontSize}; 

margin-top:-15px;

}

`;
/*font-size: ${fontSize.label.replace('pt', 'px')};*/







export default FontSizeDropDown