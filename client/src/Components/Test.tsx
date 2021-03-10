// @ts-nocheck
import React, { useEffect, useState, useContext, useRef } from "react";
import { Editor } from "draft-js";
import mediaBlockRenderer from "../entities/mediaBlockRenderer";

import styled from "styled-components"


import {
    EditorState,
    RichUtils,
    AtomicBlockUtils,
    CompositeDecorator,
    ContentState,
    convertToRaw,
    convertFromRaw,
    ContentBlock,
    DraftHandleValue,
    DraftEditorCommand,
} from "draft-js";

import { EditorContext } from "../Contexts/EditorContext";

const Test = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { okToDisplay, onChange } = useContext(EditorContext);

    const editor = useRef(null)

    const getFocus = () => {

        console.log(' I HAVE FOCUS')
    }


    return (
        <Area>
            <Editor
                readOnly={true}
                editorState={editorState}
                blockRendererFn={mediaBlockRenderer}
                onChange={onChange}
                ref={editor}
                onFocus={() => getFocus()}

            >

            </Editor>
        </Area>
    )
}

const Area = styled.div`
width:500px;
height:100px;
padding-top:600px;
padding-left:600px;

`;

export default Test;