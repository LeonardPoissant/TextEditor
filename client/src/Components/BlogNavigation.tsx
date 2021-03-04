// @ts-nocheck

import React, { useState, useEffect, useContext } from "react";

import { Link, useParams, useHistory } from "react-router-dom";

import { EditorContext } from "./Contexts/EditorContext";
const GoToNextPage = () => {
    const {

        page,
        aTest,
        setTest
    } = useContext(EditorContext);

    let history = useHistory()

    const [pageNumber, setPageNumber] = useState(0)




    const handleNextPage = () => {
        setTest(page + 1)
    }
    const handlePreviousPage = () => {
        setTest(page - 1)
    }


    useEffect(() => {
        history.push(`/Posts/${page}`)
    }, [page])


    return (
        <>
            <div onClick={() => handleNextPage()} > Next Page</div>
            <div onClick={() => handlePreviousPage()} > Previous Page</div>
        </>
    )
}

export default GoToNextPage