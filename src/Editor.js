import React, { useState, useEffect, useRef, useContext } from "react";
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  ContentState,
  convertToRaw,
  convertFromRaw,
  SelectionState,
} from "draft-js";
import { Link } from "react-router-dom";

import Editor from "draft-js-plugins-editor";

import mediaBlockRenderer from "./entities/mediaBlockRenderer";

import InsertLinkIcon from "@material-ui/icons/InsertLink";
import ImageIcon from "@material-ui/icons/Image";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CloseIcon from "@material-ui/icons/Close";
import styled from "styled-components";

import { EditorContext } from "./Utils/EditorContext";

import ToolBar from "./ToolBar";

const TextEditor = () => {
  const {
    editorState,
    onChange,
    clearLocalStorage,
    handleKeyCommand,
    okToDisplay,
    active,
  } = useContext(EditorContext);

  const [focus, setFocus] = useState(null);

  // References to the corresponding DOM nodes when new input is rendered.
  const Inputref = useRef(null);

  //Keeps the focus on the input field (the Editor) when pressing a button  and creates the ref for conditional rendering

  useEffect(() => {
    setFocus(Inputref.current && Inputref.current.focus());
  });
  console.log(editorState);

  return (
    <Wrapper active={active}>
      <ToolBar />
      {okToDisplay ? (
        <TextArea onClick={setFocus}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            ref={!active ? Inputref : null}
          ></Editor>
        </TextArea>
      ) : (
        <> </>
      )}

      <LinksToPreviewAndPostDiv>
        <SeePreview to={{ pathname: "/Output" }}>PREVIEW</SeePreview>
        <ClearContent onClick={clearLocalStorage}>CLEAR</ClearContent>

        <PostContent>POST </PostContent>
      </LinksToPreviewAndPostDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ active }) =>
    active &&
    `
    background: rgb(242, 242, 242);
    pointer-events: none;
  `};
`;

const TextArea = styled.div`
  height: 250px;
  overflow-y: auto;
  width: 500px;
  border-style: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
  display: flex;
  @media (max-width: 736px) {
    width: 100%;
  } ;
`;

/*const ToolBar = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px;
  justify-content: space-around;
  border-left: solid;
  border-top: solid;
  border-right: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
  @media (max-width: 736px) {
    display: none;
  }
`;*/

const ToolBarForDevices = styled.div`
  display: none;
  @media (max-width: 736px) {
    display: flex;
    flex-direction: row;
    padding: 6px;
    justify-content: space-around;
    border-left: solid;
    border-top: solid;
    border-right: solid;
    border-color: rgb(161, 161, 161);
    border-width: 1px;
    -webkit-overflow-scrolling: touch;
  }
`;

const ChangeStyleButton = styled.button`
  height: 25px;
  width: 25px;
  margin: 4px;
  border-style: none;

  ${({ isClicked }) =>
    isClicked &&
    `
    background-color: rgb(242, 242, 242);
  `};
`;

const EmbedButton = styled.button`
  height: 25px;
  width: 25px;
  padding: 0px 0px;
  margin: 4px;
  border-style: none;
`;

const CloseWindow = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseWindowButton = styled.button`
  border-style: none;
  background-color: white;
  outline: none;
  cursor: pointer;
`;

const LinksToPreviewAndPostDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  padding: 10px;
  @media (max-width: 736px) {
    width: 100%;
  }
`;

const SeePreview = styled(Link)`
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
const MediaWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const AddMediaWindow = styled.div`
  position: absolute;
  height: 150px;
  width: 300px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 10px rgb(204, 204, 204);
  display: flex;
  z-index: 10;

  ${({ active }) =>
    active &&
    `
    background: white;
    pointer-events:auto;
  `}
`;

const HandleInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 50%;
`;

const UrlInput = styled.input``;

const ConfirmUrlButton = styled.button`
  padding: 10px;
  width: 70px;
`;

const ClearContent = styled.button`
  color: black;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  padding: 6px;
  :hover {
    background-color: rgb(214, 210, 210);
  }
`;

export default TextEditor;
