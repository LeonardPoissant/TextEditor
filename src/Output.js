import React, { useState, useEffect } from "react";
import { Editor, convertFromRaw, convertToRaw, EditorState } from "draft-js";
import { Link } from "react-router-dom";

import styled from "styled-components";

import mediaBlockRenderer from "./entities/mediaBlockRenderer";

const Preview = (props) => {
  const [editorPreviewState, setEditorPreviewState] = useState({});
  const [okToDisplay, setOkToDisplay] = useState(false);

  useEffect(() => {
    const content = localStorage.getItem("content");

    console.log("content", typeof content);
    if (content) {
      setOkToDisplay(true);
      setEditorPreviewState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
      console.log("WITHCONTENT", editorPreviewState);
    } else {
      setOkToDisplay(true);
      setEditorPreviewState(EditorState.createEmpty());
      console.log("WITHOUT", editorPreviewState);
    }
  }, []);

  console.log(localStorage);

  return (
    <>
      <div>PREVIEW</div>
      <EditorWrapper>
        {okToDisplay ? (
          <Editor
            readOnly={true}
            editorState={editorPreviewState}
            blockRendererFn={mediaBlockRenderer}
          />
        ) : (
          <div>Loading... </div>
        )}
      </EditorWrapper>
      <BackToEditor to={"/Editor"}>Back to Editor </BackToEditor>
    </>
  );
};

const EditorWrapper = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
`;

const BackToEditor = styled(Link)`
  text-decoration: none;
  color: black;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  padding: 6px;
  :hover {
    background-color: rgb(214, 210, 210);
  }
`;
export default Preview;
