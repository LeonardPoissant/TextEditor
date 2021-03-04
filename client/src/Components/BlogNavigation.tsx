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

    const [numOfPages, setNumOfPages] = useState(0)

    let n = 5

    let arrayOfPages;

    if (numOfPages % n != 0) {
        arrayOfPages = [...Array(numOfPages % n + 1).keys()]
    } else {
        arrayOfPages = [...Array(numOfPages % n).keys()]
    }
    console.log(numOfPages % n)
    console.log('ARRA', arrayOfPages)




    useEffect(() => {
        fetch(`/posts`)
            .then((res) => res.json())
            .then((data) => {

                setNumOfPages(data.data)
            })

    }, [])






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

            {arrayOfPages.map((page, index) => (
                <div key={index}>{page}</div>
            ))}




        </>
    )
}

export default GoToNextPage