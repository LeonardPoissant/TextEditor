// @ts-nocheck

import React, { useContext, useState } from "react"

import styled from "styled-components"

import { EditorContext } from "../../Contexts/EditorContext";


const PageNavigationIcon = (props) => {
    const {
        page,
        setPage
    } = useContext(EditorContext);

    const [styles, setStyles] = useState(false)


    const handleMouseEnter = () => {
        setStyles(!styles)
        console.log('YA OK --------', styles)
    }

    const handleMouseLeave = () => {
        setStyles(!styles)

        console.log('YA OK --------', styles)
    }

    console.log('YA OK --------', styles)


    return (
        <Wrapper index={{ ...props.index }} onClick={() => props.onClick(props.page)} onMouseEnter={() => handleMouseEnter()} onMouseLeave={() => handleMouseLeave()}>{props.page}</Wrapper>
    )


}

const Wrapper = styled.div`
display:flex;
justify-content:center;
font-size:20px;
margin:5px;
cursor: pointer;
:hover{
    font-size:30px;

  /*  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
    -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;*/
}
min-width:20px;
padding-top:5px;

`;

export default PageNavigationIcon


