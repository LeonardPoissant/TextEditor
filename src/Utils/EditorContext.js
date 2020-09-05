import React, { createContext, useState, useEffect } from "react";

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

export const EditorContext = createContext(null);

export default ({ children }) => {
  const [editorState, setEditorState] = useState({});
  const [promptForURL, setPromptForURL] = useState(false);
  const [URLValue, setURLValue] = useState("");
  const [URLType, setURLType] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [active, setActive] = useState(false);
  const [okToDisplay, setOkToDisplay] = useState(false);
  const [clear, setClear] = useState(false);
  const [currentStyle, setCurrentStyle] = useState({});
  const [promptForLink, setPromptForLink] = useState(false);

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

  console.log(decorator);

  // Create the Editor whith either already input content (On page change or refresh we rerender with that) or no content stored in the localStorage.

  useEffect(() => {
    const content = localStorage.getItem("content");

    if (content) {
      setOkToDisplay(true);
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
      );
      console.log("WITHCONTENT", editorState);
    } else {
      setOkToDisplay(true);
      setEditorState(EditorState.createEmpty(decorator));
      console.log("WITHOUT", editorState);
    }
  }, []);

  // store on localStorage

  const saveContent = (content) => {
    window.localStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };
  const clearLocalStorage = () => {
    setClear(!clear);
    localStorage.clear("content");
    setEditorState(EditorState.createEmpty(decorator));
  };

  //OnChange, content is stored on the localStorage, editorState is updated.
  const onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    const inlineStyle = editorState.getCurrentInlineStyle();
    const isBold = inlineStyle.has("BOLD");
    const isItalic = inlineStyle.has("ITALIC");
    const isUnderline = inlineStyle.has("UNDERLINE");

    saveContent(contentState);
    setEditorState(editorState);
    setCurrentStyle(inlineStyle);
    setIsBold(isBold);
    setIsItalic(isItalic);
    setIsUnderline(isUnderline);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);

      return true;
    }
    return false;
  };

  const toggleBold = (e) => {
    e.preventDefault();
    setIsBold(!isBold);
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const toggleItalic = (e) => {
    e.preventDefault();
    setIsItalic(!isItalic);
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleUnderLine = (e) => {
    e.preventDefault();
    setIsUnderline(!isUnderline);
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleURL = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setURLValue(value);
  };

  const addLink = () => {
    setActive(!active);
    setEditorState(editorState);
    setPromptForLink(!promptForLink);

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
      setPromptForURL(!promptForURL);

      setURLValue(url);
    }
  };
  const confirmLink = () => {
    setEditorState(editorState);
    setURLValue(URLValue);
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: URLValue }
    );

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    console.log(entityKey);
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    setEditorState(
      RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      )
    );

    setPromptForURL(!promptForURL);
    setPromptForLink(!promptForLink);

    setActive(!active);
  };

  const promptForMedia = (type) => {
    setEditorState(editorState);
    setURLValue("");
    setURLType(type);
  };

  const addImage = () => {
    setPromptForURL(!promptForURL);
    setActive(!active);
    promptForMedia("image");
  };

  const addVideo = () => {
    setPromptForURL(!promptForURL);

    setActive(!active);
    promptForMedia("VIDEOTYPE");
  };

  const confirmMedia = () => {
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
    setPromptForURL(!promptForURL);
    setActive(!active);
  };

  const handleClose = () => {
    setPromptForURL(!promptForURL);

    setActive(!active);
  };

  return (
    <EditorContext.Provider
      value={{
        editorState,
        saveContent,
        onChange,
        clearLocalStorage,
        handleKeyCommand,
        okToDisplay,
        isBold,
        isItalic,
        isUnderline,
        toggleBold,
        toggleItalic,
        toggleUnderLine,
        promptForURL,
        handleURL,
        URLValue,
        addLink,
        confirmLink,
        addImage,
        addVideo,
        handleURL,
        confirmMedia,
        handleClose,
        active,
        promptForLink,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
