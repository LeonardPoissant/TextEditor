import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";


const SideMenu =()=>{

    return(
    <Wrapper>


        <ul>
            <li >
            <Link to={{ pathname: "/Posts" }}>My posts</Link>
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

