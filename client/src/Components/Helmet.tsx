//@ts-nocheck

import React, { useState, useEffect } from "react";

import { Helmet } from "react-helmet";



const MetaTags = (props) => {

    const [test, setTest] = useState("")

    useEffect(() => {
        setTest(props.description)
    }, [props.description])


    const description = props.description

    return (
        <Helmet>
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://metatags.io/" />
            <meta property="twitter:title" content="Meta Tags — Preview, Edit and Generate" />
            <meta property="twitter:description" content="With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!" />
            <meta property="twitter:image" content="/Assets/logo.png" />
        </Helmet>
    )
}


export default MetaTags;