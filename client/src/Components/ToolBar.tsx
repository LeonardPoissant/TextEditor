// @ts-nocheck
import React, { useEffect, useRef, useContext, useState } from "react";

import InsertLinkIcon from "@material-ui/icons/InsertLink";
import ImageIcon from "@material-ui/icons/Image";
import YouTubeIcon from "@material-ui/icons/YouTube";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import FontSizeDropDown from "./FontSizeDropDown";
import ColorDropDown from "./ColorPicker";
import ColorIconDropDown from "./Color-Icon-Dropdown";
import TextAlignButtons from "./Text-align-botton"
import ColorPicker from "./ReactColor";
import ColorPickerV2 from "./ColorPicker/ColorPickerV2"


import styled from "styled-components";

import { EditorContext } from "../Contexts/EditorContext";

interface AddMediaWIndowProps {
  active?: boolean;
}

interface ButtonStyleProps {
  isClicked?: boolean;
}

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
    open,
    setOpen,
    toggleFontSizeStyle,
    toggleTextColor,
    openFsDropDown,
    setOpenFsDropDown,
    openColorPicker,
    setOpenColorPicker,
    color,
    iconColor,
    toggleTextAlignement

  } = useContext(EditorContext);

  const videoRef = useRef() as any;






  useEffect(() => {
    if (promptForURL) {
      videoRef.current.focus();
    }
  }, [promptForURL]);


  const getFocus = () => {


    props.editor.current && props.editor.current.focus();

    //console.log('FOCUS--', editor.current.focus())
  }

  const handleOpenFsDropDown = () => {
    if (openColorPicker) {
      setOpenColorPicker(!openColorPicker)
    }
    setOpenFsDropDown(!openFsDropDown)
  }

  const handleOpenColorPicker = () => {
    console.log('here')
    if (openFsDropDown) {
      setOpenFsDropDown(!openFsDropDown)
    }
    setOpenColorPicker(!openColorPicker)
  }



  return (
    <ParentWrapper>
      <Wrapper className="I AM A CLASS NAME">

        <ChangeStyleButton
          onMouseDown={(e) => toggleBold(e)}
          style={isBold ? { backgroundColor: "grey" } : { backgroundColor: "" }}

        >
          <b>B</b>
        </ChangeStyleButton>
        <ChangeStyleButton
          onMouseDown={(e) => toggleItalic(e)}
          style={isItalic ? { backgroundColor: "grey" } : { backgroundColor: "" }}
        >
          {" "}
          <i>I</i>
        </ChangeStyleButton>
        <ChangeStyleButton
          onMouseDown={(e) => toggleUnderLine(e)}
          style={
            isUnderline ? { backgroundColor: "grey" } : { backgroundColor: "" }
          }
        >
          <u>U</u>
        </ChangeStyleButton>
        <EmbedButton onMouseDown={() => addLink()}>
          <InsertLinkIcon
            style={{
              fontSize: 20,
            }}
          />
        </EmbedButton>
        <EmbedButton onMouseDown={() => addImage()}>
          <ImageIcon
            style={{
              fontSize: 20,
            }}
          />
        </EmbedButton>

        <EmbedButton onMouseDown={() => addVideo()}>
          <YouTubeIcon
            style={{
              fontSize: 20,
            }}
          />
        </EmbedButton>
        <ChangeStyleButton>
          <div onClick={() => handleOpenFsDropDown()}>T</div>
        </ChangeStyleButton>
        <ColorIconDropDown onClick={() => handleOpenColorPicker()} onChangeColor={iconColor} onChooseColor={color} />

        {promptForURL ? (
          <AddMediaWindow active={active}>
            <CloseWindow>
              <CloseWindowButton onClick={() => handleClose()}>
                <CloseIcon />
              </CloseWindowButton>
            </CloseWindow>
            <HandleInputDiv>
              <UrlInput
                onChange={(e) => handleURL(e)}
                ref={videoRef}
                value={URLValue}
                placeholder={"Paste Url here"}
              ></UrlInput>
              <ConfirmUrlButton
                disabled={URLValue ? false : true}
                onClick={
                  promptForLink ? () => confirmLink() : (e) => confirmMedia(e)
                }
              >
                OK
            </ConfirmUrlButton>
            </HandleInputDiv>
            <Message>
              * try a different url if your media is not displayed
          </Message>
          </AddMediaWindow>
        ) : (
          <></>
        )}

        <CollapseWarning in={open}>
          <WarningMessage
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Select the text you want to hyperlink first!
        </WarningMessage>
        </CollapseWarning>
        <StylesWrapper>
          <DropDownWrapper>
            {openFsDropDown ? <FontSizeDropDown onToggle={toggleFontSizeStyle} /> : <></>}
            {openColorPicker ? <ColorPickerV2 onToggle={toggleTextColor} /> : <></>}
          </DropDownWrapper>
        </StylesWrapper>
        <ObliqueLeft></ObliqueLeft>
      </Wrapper>
    </ParentWrapper>
  );
};

const Wrapper = styled.div`
position:relative;

  display: flex;
  width:500px;
  height:100px;
  flex-direction: row;
  padding: 6px;
  justify-content: space-around;
  border-left: solid;
  border-top: solid;
  border-right: solid;
 
  border-color: rgb(161, 161, 161);
  border-width: 1px;
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

const ParentWrapper = styled.div`
display:flex;
flex-direction:column;

`;

const StylesWrapper = styled.div`

`;


const ChangeStyleButton = styled.button<ButtonStyleProps>`

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

const AddMediaWindow = styled.div<AddMediaWIndowProps>`
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

const CollapseWarning = styled(Collapse)`
  display: flex;
  align-items: center;
  position: fixed;
  margin-top: 38px;
  z-index: 1;
`;
const WarningMessage = styled(Alert)``;

const Message = styled.div`
  width: 100%;
  font-size: 15px;
  margin-top: 15px;
`;

const DropDownWrapper = styled.div`
display:flex;
flex-direction:column;
`;

const ObliqueLeft = styled.div`
width: 6px;
  
margin-left: -518px;
    margin-top: 126px;


border-bottom: 1px solid  rgb(161, 161, 161);;
-webkit-transform:
            translateY(-20px)
            translateX(5px)
            rotate(2deg); 
        position: absolute;
`;



export default ToolBar;
