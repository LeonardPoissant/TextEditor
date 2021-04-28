// @ts-nocheck
import React, { useEffect, useState, useContext } from "react";
import {
    BrowserRouter as Router,
    Switch,
    useLocation,
    useParams
} from "react-router-dom";

import {
    Editor,
    EditorState,
    getCurrentContent,
    RichUtils,
    AtomicBlockUtils,
    CompositeDecorator,
    ContentState,
    convertToRaw,
    convertFromRaw,
    ContentBlock,
    DraftHandleValue,
    DraftEditorCommand,
    Modifier,
} from "draft-js";

import mediaBlockRenderer from "../entities/mediaBlockRenderer";
import styled from "styled-components";
import { EditorContext } from "../Contexts/EditorContext";

//import PostTest from "../Contexts/EditorContext"

import draftJsCss from "../Utils/EditorCss";
import customStylemap from "../Utils/CustomStyleMap"

const BlogPostPage = () => {
    const { okToDisplay, onChange, PostTest, decorator } = useContext(EditorContext);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const location = useParams();

    let id = location.id;
    let title = location.title

    useEffect(() => {

        console.log(id, title)
        fetch(`/post/${id}/${title}`)
            .then((res) => res.json())
            .then((db) => {
                const convertedContent = convertFromRaw(db.data.convertedContent);
                // console.log(convertedContent);
                setEditorState(
                    EditorState.createWithContent(convertedContent, decorator)
                );
                console.log(db)
            })
            .catch((err) => {
                console.log(err);
            });

    }, [id, title])

    console.log('IM HERE')

    return (<div className="IM HERE">



        <EditorWrapper className="EDIWRAP">

            <Editor
                readOnly={true}
                editorState={editorState}
                blockRendererFn={mediaBlockRenderer}
                onChange={onChange}
                customStyleMap={customStylemap}
            />

        </EditorWrapper>
    </div>)
};

const EditorWrapper = styled.div`
  width: 500px;

  hyphens: auto;
  & {
    ${draftJsCss}
  }
  `;

export default BlogPostPage;