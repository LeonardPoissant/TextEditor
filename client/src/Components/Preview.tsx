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

  /*const PostTest = ()=>{
    const convertedContent =  JSON.stringify(convertToRaw(e))
    fetch("/test", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
       Post: convertedContent
      }),
    })
    .then((res) => res.json())
        .then((db) => {
          console.log(db);

        })
        .catch((err) => {
          console.log(err);
        });

  }*/

  /*const Test =(=>{
   
    fetch("/test", {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
       Post: convertedContent
      }),
    })
    .then((res) => res.json())
        .then((db) => {
          console.log(db);

        })
        .catch((err) => {
          console.log(err);
        });
  }*/


  return (
    <Wrapper>
      <BackToeditorForDesktop to={{ pathname: "/Editor" }}>
        BACK TO EDITOR
      </BackToeditorForDesktop>
      <div></div>

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
      <PostContentForDesktop to={{ pathname: "/", state: { publish: true } }}>
        PUBLISH
      </PostContentForDesktop>
      <button onClick={() => PostTest()}>TESTTTT</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80vh;
  padding: 20px;
  @media (max-width: 736px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const EditorWrapper = styled.div`
  height: 250px;
  overflow-y: auto;
  width: 500px;
  margin: 40px 0px 40px 0px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  & {
    ${draftJsCss}
  }
  @media (max-width: 736px) {
    width: 100%;
    height: 75%;
  }
`;

const BackToEditor = styled(Link)`
  text-decoration: none;
  margin-right: 900px;
  position: fixed;
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
  margin-right: 900px;
  position: fixed;
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
  position: fixed;
  margin-left: 900px;
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
