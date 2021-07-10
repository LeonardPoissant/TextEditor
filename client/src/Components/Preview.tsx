// @ts-nocheck

import React, { useContext } from "react";
import { Editor } from "draft-js";
import { Link } from "react-router-dom";

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

import styled from "styled-components";
import { EditorContext } from "../Contexts/EditorContext";

//import PostTest from "../Contexts/EditorContext"


import mediaBlockRenderer from "../entities/mediaBlockRenderer";
import draftJsCss from "../Utils/EditorCss";
import customStylemap from "../Utils/CustomStyleMap"




const Preview = () => {
  const { editorState, okToDisplay, onChange, PostTest } = useContext(EditorContext);




  return (
    <Wrapper>
      <BackToeditorForDesktop to={{ pathname: "/Editor" }}>
        BACK TO EDITOR
      </BackToeditorForDesktop>


      <EditorWrapper className="EDIWRAP">
        {okToDisplay ? (
          <Editor
            readOnly={true}
            editorState={editorState}
            blockRendererFn={mediaBlockRenderer}
            onChange={onChange}
            customStyleMap={customStylemap}
          />
        ) : (
          <div>Loading... </div>
        )}
      </EditorWrapper>
      <LinksToPreviewAndPostDiv>
        <BackToEditor className="BACKTO EDI" to={{ pathname: "/Editor" }}>
          Back to Editor{" "}
        </BackToEditor>

        <PostContent to={{ pathname: "/", state: { publish: true } }}>
          PUBLISH{" "}
        </PostContent>
      </LinksToPreviewAndPostDiv>
      <div></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;
  min-height:100vh;

  @media (max-width: 736px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const EditorWrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
hyphens:auto;
  border-style: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
  min-height: fit-content;

  hyphens: auto;
  & {
    ${draftJsCss}
  }
  @media (min-width: 736px) {
    min-width: 600px;
  }
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
  @media (max-width: 736px) {
    margin-right: 20px;
    position: static;
    color: black;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    padding: 6px;
    :hover {
      background-color: rgb(214, 210, 210);
    }
  }
`;

const BackToeditorForDesktop = styled(Link)`
  text-decoration: none;
  color: black;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  padding: 6px;
  :hover {
    background-color: rgb(214, 210, 210);
  }
  @media (max-width: 736px) {
    display: none;
  }
`;

const LinksToPreviewAndPostDiv = styled.div`
  display: none;
  @media (max-width: 736px) {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;
const PostContent = styled(Link)`
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

const PostContentForDesktop = styled(Link)`


  text-decoration: none;
  color: black;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  padding: 6px;
  :hover {
    background-color: rgb(214, 210, 210);
  }

  @media (max-width: 736px) {
    display: none;
  }
`;

export default Preview;
