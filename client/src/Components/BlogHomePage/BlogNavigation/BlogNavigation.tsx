// @ts-nocheck

import React, { useState, useEffect, useContext } from "react";

import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components"

import { EditorContext } from "../../../Contexts/EditorContext";
import PageNavigationIcon from "./PageNumberStyle";
import NavigationIcon from "./NavigationIcon"
import LeftArrow from "../Assets/left-arrow-5737.svg"
import RightArrow from "../Assets/next-arow-5738.svg"
const BlogNavigation = () => {
    const {
        page,
        setPage
    } = useContext(EditorContext);

    let history = useHistory();

    const [arrayOfPages, setArrayOfPages] = useState([]);

    const [test, setTest] = useState(false)

    useEffect(() => {
        fetch(`/posts`)
            .then((res) => res.json())
            .then((data) => {
                setArrayOfPages(data.data)
            })
    }, []);

    useEffect(() => {
        history.push(`/Posts/${page}`)
    }, [page]);

    const handleNextPage = () => {
        if (arrayOfPages.length > page) {
            setPage(page + 1)
        }
    };
    const handlePreviousPage = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    };

    const handleGoToPage = (page) => {
        setPage(page)
        history.push(`/Posts/${page}`)
    }

    //  <Arrow src={LeftArrow} onClick={handlePreviousPage} text={"Previous"} />

    // <Arrow src={RightArrow} onClick={handleNextPage} text={"Next"} />

    return (
        <Wrapper >

            <Arrow onClick={handlePreviousPage} > {"<="}</Arrow>


            {arrayOfPages.map((page, index) => (
                <PageNavigationIcon key={index} page={page + 1} onClick={handleGoToPage} index={index} />
            ))}



            <Arrow onClick={handleNextPage} > {"=>"}</Arrow>


        </Wrapper>
    )
}

export default BlogNavigation

const Wrapper = styled.div`

width:200px;
display:flex;
justify-content:center;
min-height:50px;


background: linear-gradient(to right,
    #ff4b1f,
    #1fddff)
;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;





`;

const Arrow = styled.div`
padding-top:10px;

cursor:pointer;


`;

