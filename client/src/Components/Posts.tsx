// @ts-nocheck
import React, { useEffect, useState } from "react";

import styled from "styled-components"

import BlogPostBanner from "./BlogPostBanner";



const Posts = () => {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [catgerory, setCategory] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        console.log("here")
        fetch("/meta-post")
            .then((res) => res.json())
            .then((data) => {
                setPosts(data.data)
            })
    }, [])

    console.log('hereTESTPOST', posts)

    return (
        <Wrapper className="HERE?">
            {posts.map(post => (


                <BlogPostBanner
                    key={post._id}
                    title={post.title}
                    description={post.description}
                    category={post.category}
                    date={post.date}
                />


            ))}

        </Wrapper>
    )

};

export default Posts;

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;


`;
