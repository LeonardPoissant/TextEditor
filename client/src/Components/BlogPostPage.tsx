// @ts-nocheck
import React, { useEffect, useState } from "react";

import { Editor } from "draft-js";
import styled from "styled-components";

import { EditorContext } from "./Contexts/EditorContext";

import mediaBlockRenderer from "../entities/mediaBlockRenderer";


const BlogPostPage = () => {

    useEffect(() => {
        //

    }, [])

    return (<div>

        <Editor
            blockRendererFn={mediaBlockRenderer}
        />
    </div>)
}

export default BlogPostPage