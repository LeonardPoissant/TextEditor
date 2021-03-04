// @ts-nocheck
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { EditorContext } from "./Contexts/EditorContext";

const SideMenu = () => {
    const {
        page,
        aTest,
        setTest
    } = useContext(EditorContext);

    let history = useHistory();

    const handleClick = () => {
        setTest(1)
    }





    //<Link to={{ pathname: `/Posts/${0}` }}>My posts</Link>

    return (
        <Wrapper>


            <ul>
                <li >
                    <Link to={{ pathname: `/Posts/${1}` }} onClick={() => handleClick()}>My posts</Link>

                </li>
                <li>
                    <Link to={{ pathname: "/Editor" }}>Create new post</Link>
                </li>
                <li></li>
                <li></li>
            </ul>
        </Wrapper>
    )
};


const Wrapper = styled.div``;



export default SideMenu

