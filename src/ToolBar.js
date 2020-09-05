import React, { useState, useEffect, useRef, useContext } from "react";

import InsertLinkIcon from "@material-ui/icons/InsertLink";
import ImageIcon from "@material-ui/icons/Image";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CloseIcon from "@material-ui/icons/Close";

import styled from "styled-components";

import { EditorContext } from "./Utils/EditorContext";

const ToolBar = (props) => {
  const {
    isBold,
    isItalic,
    isUnderline,
    toggleBold,
    toggleItalic,
    toggleUnderLine,
    promptForURL,
    addLink,
    confirmLink,
    addImage,
    addVideo,
    handleURL,
    URLValue,
    confirmMedia,
    handleClose,
    active,
    promptForLink,
  } = useContext(EditorContext);
  const [, setIsBold] = useState(false);
  const [, setIsItalic] = useState(false);
  const [, setIsUnderline] = useState(false);
  const [, setEditorState] = useState({});
  //const [active, setActive] = useState(false);
  const [, setPromptForURL] = useState(false);
  //const [URLValue, setURLValue] = useState("");
  const [URLType, setURLType] = useState("");

  const linkRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (promptForURL) {
      videoRef.current.focus();
    }
  }, [promptForURL]);

  //Manages the focus for new input fields

  /*useEffect(() => {
    if (showURLInput) {
      linkRef.current.focus();
    } else if (promptForImageURL) {
      imageRef.current.focus();
    } else if (promptForVideoURL) {
      videoRef.current.focus();
    }
  }, [showURLInput, promptForImageURL, promptForVideoURL]);*/

  return (
    <Wrapper>
      <ChangeStyleButton
        onMouseDown={(e) => toggleBold(e)}
        style={isBold ? { backgroundColor: "grey" } : { backgroundColor: "" }}
      >
        <b>B</b>
      </ChangeStyleButton>
      <ChangeStyleButton
        onMouseDown={toggleItalic}
        style={isItalic ? { backgroundColor: "grey" } : { backgroundColor: "" }}
      >
        {" "}
        <i>I</i>
      </ChangeStyleButton>
      <ChangeStyleButton
        onMouseDown={toggleUnderLine}
        style={
          isUnderline ? { backgroundColor: "grey" } : { backgroundColor: "" }
        }
      >
        <u>U</u>
      </ChangeStyleButton>
      <EmbedButton onMouseDown={addLink}>
        <InsertLinkIcon
          style={{
            fontSize: 20,
          }}
        />
      </EmbedButton>
      <EmbedButton onMouseDown={addImage}>
        <ImageIcon
          style={{
            fontSize: 20,
          }}
        />
      </EmbedButton>

      <EmbedButton onMouseDown={addVideo}>
        <YouTubeIcon
          style={{
            fontSize: 20,
          }}
        />
      </EmbedButton>

      {promptForURL ? (
        <AddMediaWindow active={active}>
          <CloseWindow>
            <CloseWindowButton onClick={() => handleClose()}>
              <CloseIcon />
            </CloseWindowButton>
          </CloseWindow>
          <HandleInputDiv>
            <UrlInput
              onChange={handleURL}
              ref={videoRef}
              value={URLValue}
              placeholder={
                promptForURL ? "Copy video url here" : "Copy image url here"
              }
            ></UrlInput>
            <ConfirmUrlButton
              disabled={URLValue ? false : true}
              onClick={promptForLink ? confirmLink : confirmMedia}
            >
              OK
            </ConfirmUrlButton>
          </HandleInputDiv>
        </AddMediaWindow>
      ) : (
        <></>
      )}
      {/* {promptForURL ? (
        <AddMediaWindow active={active}>
          <CloseWindow>
            <CloseWindowButton onClick={() => handleClose()}>
              <CloseIcon />
            </CloseWindowButton>
          </CloseWindow>
          <HandleInputDiv>
            <UrlInput
              onChange={handleURL}
              ref={linkRef}
              value={URLValue}
              placeholder={"Copy link url here"}
            ></UrlInput>
            <ConfirmUrlButton
              className="INPUT BUITTOM"
              disabled={URLValue ? false : true}
              onClick={confirmLink}
            ></ConfirmUrlButton>
          </HandleInputDiv>
        </AddMediaWindow>
      ) : (
        <></>
      )}*/}
    </Wrapper>
  );
};

const Wrapper = styled.div`
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

export default ToolBar;
