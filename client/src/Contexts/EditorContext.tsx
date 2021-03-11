// @ts-nocheck

import React, { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
  Modifier,
} from "draft-js";


import getVideo from "../Utils/UrlUtils";

import fontSizeStyle from "../Utils/InlineStyles/FontSize";

import customStyleMap from "../Utils/CustomStyleMap"

type Props = {
  children: React.ReactNode;
  props: object;
  editorState: EditorState;
  e: MouseEvent;
  isBold: boolean;
  promptForUrl: boolean;
  content: ContentState
};

type EditorContextTypes = {
  toggleBold: Function;
  toggleUnderLine: Function;
  toggleItalic: Function;
  editorState: EditorState;
  onChange(editorState: EditorState): void;
  clearLocalStorage: Function;
  handleKeyCommand?(
    command: DraftEditorCommand,
    editorState: EditorState,
    eventTimeStamp: number
  ): DraftHandleValue;
  okToDisplay: boolean;
  active: boolean;
  findLinkEntities: Function;
  link: Function;
  saveContent: Function;
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  promptForURL: boolean;
  handleURL: Function;
  URLValue: string;
  addLink: Function;
  confirmLink: Function;
  addImage: Function;
  addVideo: Function;
  confirmMedia: Function;
  handleClose: Function;
  promptForLink: boolean;
  open: boolean;
  setOpen: Function;
  PostTest: Function;
  title: string
  setTitle: Function;
};

export const EditorContext = createContext<EditorContextTypes>({
  toggleBold: Function,
  toggleUnderLine: Function,
  toggleItalic: Function,
  editorState: new EditorState(),
  onChange: () => { },
  clearLocalStorage: Function,
  handleKeyCommand: Object,
  okToDisplay: false,
  active: false,
  findLinkEntities: Function,
  link: Function,
  saveContent: Function,
  isBold: false,
  isItalic: false,
  isUnderline: false,
  promptForURL: false,
  handleURL: Function,
  URLValue: "",
  addLink: Function,
  confirmLink: Function,
  addImage: Function,
  addVideo: Function,
  confirmMedia: Function,
  handleClose: Function,
  promptForLink: false,
  open: false,
  setOpen: Function,
  PostTest: Function,
  title: "",
  setTitle: Function
});

export default ({ children }: Props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [promptForURL, setPromptForURL] = useState(false);
  const [URLValue, setURLValue] = useState("");
  const [URLType, setURLType] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isFontSize, setIsFontSize] = useState(false)
  const [active, setActive] = useState(false);
  const [okToDisplay, setOkToDisplay] = useState(false);
  const [clear, setClear] = useState(false);
  const [, setCurrentStyle] = useState({});
  const [promptForLink, setPromptForLink] = useState(false);
  const [warning, setWarning] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("")
  const [pageNumber, setPageNumber] = useState(1);
  const [fontSizes, setFontSizes] = useState([fontSizeStyle])
  const [currentColor, setCurrentColor] = useState("")

  const [page, setPage] = useState(1)
  const [focusEditor, setFocusEditor] = useState(false)

  const [test, setTest] = useState(false)

  const aTest = () => {
    setPage(page + 1)
  }

  useEffect(() => {

    setTest(true)
  }, [])

  let abc = "testset"



  useEffect(() => {
    setPageNumber(pageNumber + 1)
  }, [])


  const link = (props: any) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>;
  };
  const findLinkEntities = (
    contentBlock: ContentBlock,
    callback: any,
    contentState: ContentState
  ) => {
    contentBlock.findEntityRanges((character: any) => {
      const entityKey: string = character.getEntity();
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

  // Create the Editor whith either already input content (On page change or refresh we rerender with that) or no content stored in the localStorage.

  useEffect(() => {
    const content = sessionStorage.getItem("content");
    if (content) {
      const convertedContent = convertFromRaw(JSON.parse(content));
      setOkToDisplay(true);
      setEditorState(
        EditorState.createWithContent(convertedContent, decorator)
      );
    } else if (content === null) {
      setOkToDisplay(true);
      setEditorState(EditorState.createEmpty(decorator));
    }
  }, []);

  // store on sessionStorage

  const saveContent = (content: ContentState) => {
    window.sessionStorage.setItem(
      "content",
      JSON.stringify(convertToRaw(content))
    );
  };
  const clearLocalStorage = () => {
    setClear(!clear);
    sessionStorage.clear();
    setEditorState(EditorState.createEmpty(decorator));
  };



  useEffect(() => {
    let current = new Date();
    setDate(current.getDate().toString() + "/" + (current.getMonth() + 1).toString() + "/" + current.getFullYear().toString())
  }, [])





  const PostTest = () => {
    const contentState = editorState.getCurrentContent();


    const convertedContent = convertToRaw(contentState)
    setTitle(title)
    setDescription(description)
    setCategory(category)

    const convertedTitle = JSON.stringify(title)
    console.log('CONTENT', convertedContent)
    console.log('TITLE', convertedTitle)
    fetch("/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        category,
        date,
        convertedContent,

      })
    })
      .then((res) => res.json())
      .then((db) => {
        console.log('DB HERE', db);

      })
      .catch((err) => {
        console.log(err);
      });

  }

  //OnChange, content is stored on the sessionStorage, editorState is updated.
  const onChange = (editorState: EditorState) => {
    const contentState = editorState.getCurrentContent();
    const inlineStyle = editorState.getCurrentInlineStyle();
    const isBold = inlineStyle.has("BOLD");
    const isItalic = inlineStyle.has("ITALIC");
    const isUnderline = inlineStyle.has("UNDERLINE");
    const isFontSize = inlineStyle.has("font_size_36")
    console.log('here')


    saveContent(contentState);
    setEditorState(editorState);
    setCurrentStyle(inlineStyle);
    setIsBold(isBold);
    setIsItalic(isItalic);
    setIsUnderline(isUnderline);
    setIsFontSize(isFontSize)


  };

  const handleKeyCommand = (command: string, editorState: EditorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);

      return "handled";
    }
    return "not-handled";
  };



  const toggleFontSizeStyle = (e, fontSize) => {
    e.preventDefault();

    const selection = editorState.getSelection();

    // allow one fontSize at a time. Turn off all active fontSizes.
    const nextContentState = Object.keys(customStyleMap)
      .reduce((contentState, fontSize) => {
        return Modifier.removeInlineStyle(contentState, selection, fontSize)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current fontSize.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, fontSize) => {
        return RichUtils.toggleInlineStyle(state, fontSize);
      }, nextEditorState);
    }

    // If the fontSize is being toggled on, apply it.
    if (!currentStyle.has(fontSize)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        fontSize
      );
    }
    onChange(nextEditorState);
  };

  const toggleTextColor = async (e, colorStyle) => {
    e.preventDefault();

    const selection = editorState.getSelection();

    // Let's just allow one color at a time. Turn off all active colors.
    const nextContentState = Object.keys(customStyleMap)
      .reduce((contentState, color) => {
        return Modifier.removeInlineStyle(contentState, selection, color)
      }, editorState.getCurrentContent());

    let nextEditorState = EditorState.push(
      editorState,
      nextContentState,
      'change-inline-style'
    );

    const currentStyle = editorState.getCurrentInlineStyle();

    // Unset style override for current color.
    if (selection.isCollapsed()) {
      nextEditorState = currentStyle.reduce((state, color) => {
        return RichUtils.toggleInlineStyle(state, color);
      }, nextEditorState);
    };

    // If the color is being toggled on, apply it.
    if (!currentStyle.has(colorStyle)) {
      nextEditorState = RichUtils.toggleInlineStyle(
        nextEditorState,
        colorStyle
      );
    }

    onChange(nextEditorState);
  }

  const toggleBold = (e: MouseEvent) => {
    e.preventDefault();
    setIsBold(!isBold);
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const toggleItalic = (e: MouseEvent) => {
    e.preventDefault();
    setIsItalic(!isItalic);
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const toggleUnderLine = (e: MouseEvent) => {
    e.preventDefault();
    setIsUnderline(!isUnderline);
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleURL = (e: MouseEvent) => {
    e.preventDefault();
    const { value }: any = e.target;
    setURLValue(value);
  };

  const addLink = () => {
    setEditorState(editorState);
    setPromptForLink(!promptForLink);

    const selection = editorState.getSelection();

    if (!selection.isCollapsed()) {
      setActive(!active);
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
    } else {
      setWarning(!warning);
      setOpen(!open);
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

  const promptForMedia = (type: string) => {
    setEditorState(editorState);
    setURLValue("");
    setURLType(type);
    console.log(type);
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

  const confirmMedia = (e: MouseEvent) => {
    e.preventDefault();
    setEditorState(editorState);
    setURLValue(URLValue);
    setURLType(URLType);

    if (URLType === "VIDEOTYPE") {
      const getYouTubeId = getVideo.getYoutubeSrc(URLValue);
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        URLType,
        "IMMUTABLE",
        { src: "https://www.youtube.com/embed/" + getYouTubeId.srcID }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity }
        // "create-entity"
      );
      setEditorState(
        AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
      );
    } else if (URLType === "image") {
      const contentState = editorState.getCurrentContent();
      const contentStateWithEntity = contentState.createEntity(
        URLType,
        "IMMUTABLE",
        { src: URLValue }
      );

      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(
        editorState,
        { currentContent: contentStateWithEntity }
        // "create-entity"
      );
      setEditorState(
        AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ")
      );
    }

    setPromptForURL(!promptForURL);
    setActive(!active);
  };

  const handleClose = () => {
    setPromptForURL(!promptForURL);

    setActive(!active);
  };

  const test12 = (e) => {

    console.log('e', e)

    console.log('erhhh')
  }

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
        confirmMedia,
        handleClose,
        active,
        promptForLink,
        findLinkEntities,
        link,
        open,
        setOpen,
        PostTest,
        title,
        setTitle,
        description,
        setDescription,
        category,
        setCategory,
        pageNumber,
        page,
        aTest,
        setPage,
        test,
        abc,
        toggleFontSizeStyle,
        test12,
        focusEditor,
        toggleTextColor

      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
