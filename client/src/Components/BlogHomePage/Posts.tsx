// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";

import styled from "styled-components";
import { Link, useParams } from "react-router-dom";


import BlogPostBanner from "./BlogPostBanner";

import { EditorContext } from "../Contexts/EditorContext";

const Posts = () => {
    const {



        page,
        aTest
    } = useContext(EditorContext);
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [catgerory, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [id, setId] = useState("")
    const location = useParams()



    useEffect(() => {

        fetch(`/posts/${page}`)
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data)
                setPosts(data.data)
            })
    }, [page])




    useEffect(() => {

        posts.map((post) => {
            setId(post._id.toString())
        })

    }, [posts])

    const handleClick = () => {

    }

    //if (posts[0] != undefined) { console.log('-ID', posts[0]._id) }



    return (
        <Wrapper className="HERE?">
            { posts[0] != undefined ? posts.map((post, index) => (
                <StyledLink to={`/Post/${post._id}/${post.title}`} key={post._id}>
                    <BlogPostBanner

                        title={post.title}
                        description={post.description}
                        category={post.category}
                        date={post.date}
                    />
                </StyledLink>


            )) : <div></div>}
        </Wrapper>
    )

};

export default Posts;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 60vh;
padding:30px;

`;


const StyledLink = styled(Link)`
text-decoration:none;

`;

