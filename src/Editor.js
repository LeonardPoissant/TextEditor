import React, { useState, useEffect, useRef } from "react";
import {
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  CompositeDecorator,
  ContentState,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { Link } from "react-router-dom";

import Editor from "draft-js-plugins-editor";

import mediaBlockRenderer from "./entities/mediaBlockRenderer";

import InsertLinkIcon from "@material-ui/icons/InsertLink";
import ImageIcon from "@material-ui/icons/Image";
import YouTubeIcon from "@material-ui/icons/YouTube";

import styled from "styled-components";

const TextEditor = () => {
  const link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>;
  };
  const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === "LINK"
      );
    }, callback);
  };
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: link,
    },
  ]);

  const [editorState, setEditorState] = useState({});
  const [showURLInput, setShowURLInput] = useState(false);
  const [promptForImageURL, setPromptForImageURL] = useState(false);
  const [promptForVideoURL, setPromptForVideoURL] = useState(false);
  const [URLValue, setURLValue] = useState("");
  const [URLType, setURLType] = useState("");
  const [active, setActive] = useState(false);
  const [okToDisplay, setOkToDisplay] = useState(false);
  const [readyToEdit, setReadyToEdit] = useState(false);
  const [clear, setClear] = useState(false);

  // References to the corresponding DOM nodes when new input is rendered.
  const Inputref = useRef(null);
  const linkRef = useRef();
  const imageRef = useRef();
  const videoRef = useRef();

  //Keeps the focus on the input field (the Editor) when pressing a button  and creates the ref for conditional rendering

  const toggleEditing = () => {
    setReadyToEdit(!readyToEdit);
  };
  useEffect(() => {
    if (readyToEdit) {
      Inputref.current && Inputref.current.focus();
      console.log("ONLOAD", Inputref);
    }
  }, [readyToEdit]);

  //Manages the focus for new input fields

  useEffect(() => {
    if (showURLInput) {
      linkRef.current.focus();
    } else if (promptForImageURL) {
      imageRef.current.focus();
    } else if (promptForVideoURL) {
      console.log("PROMPTVIDEO", videoRef, promptForVideoURL);
      videoRef.current.focus();
    }
  }, [showURLInput, promptForImageURL, promptForVideoURL]);

  //Local Storage functions

  // Create the Editor whith either already input content (On page change or refresh we rerender with that) or no content stored in the localStorage.

  useEffect(() => {
    const content = localStorage.getItem("content");

    if (content) {
      setOkToDisplay(true);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
    } else {
      setOkToDisplay(true);
      setEditorState(EditorState.createEmpty(decorator));
    }
  }, []);

  //Method to store on localStorage

  const saveContent = (content) => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };

  //OnChange, content is stored on the localStorage and editorState is updated.

  const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    saveContent(contentState);
    setEditorState(editorState);
  };

  //OnClick, reset relevant localStorage

  const clearLocalStorage = () => {
    setClear(true);
    localStorage.clear("content");
    setEditorState(EditorState.createEmpty(decorator));
  };

  const toggleBold = (e) => {
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const toggleItalic = (e) => {
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleUnderLine = (e) => {
    e.preventDefault();
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleURL = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setURLValue(value);
  };

  const addLink = (e) => {
    e.preventDefault();
    setActive(true);
    setEditorState(editorState);

    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      setShowURLInput(true);

      setURLValue(url);
    }
  };

  const confirmLink = (e) => {
    e.preventDefault();
    setEditorState(editorState);
    setURLValue(URLValue);
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: URLValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      setShowURLInput(false),
      setURLValue(""),
      Inputref.current.focus()
    );
  };

  const promptForMedia = (type) => {
    setEditorState(editorState);
    setURLValue("");
    setURLType(type);
  };

  const confirmMedia = (e) => {
    e.preventDefault();
    setEditorState(editorState);
    setURLValue(URLValue);
    const embedURL = URLValue.replace("watch?v=", "embed/");
    setURLType(URLType);
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      URLType,
      "IMMUTABLE",
      { src: embedURL }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    setEditorState(
      AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
    );
    setPromptForImageURL(false);
    setPromptForVideoURL(false);
    setActive(false);
  };

  const addImage = () => {
    setPromptForImageURL(true);
    setActive(true);
    promptForMedia("image");
  };

  const addVideo = () => {
    setPromptForVideoURL(true);
    console.log(promptForVideoURL);
    setActive(true);
    promptForMedia("VIDEOTYPE");
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);

      return "handled";
    }
    return "not-handled";
  };

  return (
    <Wrapper active={active}>
      <ToolBar>
        <BoldButton onMouseDown={toggleBold}>
          <b>B</b>
        </BoldButton>
        <ItalicButton onMouseDown={toggleItalic}>
          {" "}
          <i>I</i>
        </ItalicButton>
        <UnderlineButton onMouseDown={toggleUnderLine}>
          <u>U</u>
        </UnderlineButton>
        <EmbedLinkButton onMouseDown={addLink}>
          <InsertLinkIcon
            style={{
              fontSize: 20,
            }}
          />
        </EmbedLinkButton>
        <EmbedImageButton onMouseDown={addImage}>
          <ImageIcon
            style={{
              fontSize: 20,
            }}
          />
        </EmbedImageButton>

        {showURLInput ? (
          <AddMediaWindow>
            {" "}
            <UrlInput
              onChange={handleURL}
              ref={linkRef}
              value={URLValue}
            ></UrlInput>
            <ConfirmUrlButton
              className="INPUT BUITTOM"
              onClick={(e) => confirmLink}
            ></ConfirmUrlButton>
          </AddMediaWindow>
        ) : (
          <></>
        )}

        <EmbedVideoButton onMouseDown={addVideo}>
          <YouTubeIcon
            style={{
              fontSize: 20,
            }}
          />
        </EmbedVideoButton>
      </ToolBar>
      {okToDisplay ? (
        <TextArea onMouseDown={toggleEditing}>
          <Editor
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            ref={Inputref}
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
      <MediaWrapper>
        {promptForVideoURL || promptForImageURL ? (
          <AddMediaWindow active={active}>
            {" "}
            <UrlInput
              onChange={handleURL}
              ref={promptForVideoURL ? videoRef : imageRef}
              value={URLValue}
              placeholder={
                promptForVideoURL
                  ? "Copy video url here"
                  : "Copy image url here"
              }
            ></UrlInput>
            <ConfirmUrlButton
              className="INPUT BUITTOM"
              disabled={URLValue ? false : true}
              onClick={confirmMedia}
            >
              OK
            </ConfirmUrlButton>
          </AddMediaWindow>
        ) : (
          <></>
        )}
      </MediaWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  ${({ active }) =>
    active &&
    `
    background: rgb(242, 242, 242);
    pointer-events: none;
  `}
`;

const TextArea = styled.div`
  height: 250px;
  overflow-y: auto;
  width: 500px;
  border-style: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;

  display: flex;
`;

const ToolBar = styled.div`
  display: flex;
  flex-direction: row;
`;

const BoldButton = styled.button`
  height: 25px;
  width: 25px;
`;

const ItalicButton = styled.button`
  height: 25px;
  width: 25px;
`;
const UnderlineButton = styled.button`
  height: 25px;
  width: 25px;
`;

const EmbedLinkButton = styled.button`
  height: 25px;
  width: 25px;
  padding: 0px 0px;
`;

const EmbedImageButton = styled.button`
  height: 25px;
  width: 25px;
  padding: 0px 0px;
`;

const EmbedVideoButton = styled.button`
  width: 25px;
  height: 25px;
  padding: 0px 0px;
`;

const LinksToPreviewAndPostDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
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
  height: 200px;
  width: 300px;
  border-radius: 4px;
  /*border-style: solid;
  border-width: 1px;*/
  box-shadow: 5px 10px rgb(204, 204, 204);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: absolute;
  ${({ active }) =>
    active &&
    `
    background: white;
    pointer-events:auto;
  `}
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
