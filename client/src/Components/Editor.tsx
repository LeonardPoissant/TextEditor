// @ts-nocheck

import React, { useEffect, useRef, useContext } from "react";

import { Link } from "react-router-dom";
import { Editor } from "draft-js";
import styled from "styled-components";

import { EditorContext } from "../Contexts/EditorContext"
import ToolBar from "./ToolBar";
import mediaBlockRenderer from "../entities/mediaBlockRenderer";
import draftJsCss from "../Utils/EditorCss";
import customStylemap from "../Utils/CustomStyleMap"


interface WrapperProps {
  active?: boolean;
}

interface EditorProps {
  decorators?: Object;
}

const TextEditor = () => {
  const {
    editorState,
    onChange,
    clearLocalStorage,
    handleKeyCommand,
    okToDisplay,
    active,
    findLinkEntities,
    link,
    PostTest,
    focusEditor,
    state,
    openFsDropDown,
    openColorPicker,
    selectedIndex,
  } = useContext(EditorContext);

  const editor = useRef(null);

  useEffect(() => {
    editor.current && editor.current.focus();
  }, [openFsDropDown, openColorPicker, selectedIndex]);

  const customDecorator = [
    {
      strategy: findLinkEntities,
      component: link,
    },
  ];
  const getFocus = () => {

    editor.current && editor.current.focus();

  }




  return (
    <Wrapper active={active as any} className="RichEditor-root">

      <ToolBar focusEditor={() => getFocus()} editor={editor} />
      {okToDisplay ? (
        <TextArea onClick={() => getFocus()}  >
          <StyledEditor
            blockRendererFn={mediaBlockRenderer}
            customStyleMap={customStylemap}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            decorators={customDecorator}
            onFocus={getFocus}
            placeholder="Tell a story..."
            ref={editor}
            spellCheck={true}
          ></StyledEditor>
        </TextArea>
      ) : (
        <> </>
      )}

      <LinksToPreviewAndPostDiv>
        <SeePreview to={{ pathname: "/Preview" }}>PREVIEW</SeePreview>
        <ClearContent onClick={() => clearLocalStorage()}>CLEAR</ClearContent>
        <PostContent to={{ pathname: "/", state: { publish: true } }}>
          PUBLISH{" "}
        </PostContent>
      </LinksToPreviewAndPostDiv>
      <button onClick={() => PostTest()}>TESTTTT</button>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperProps>`
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
 
  padding: 20px;
`;

const StyledEditor = styled(Editor) <EditorProps>`
width:min-content;


`;

const TextArea = styled.div`
  height: 250px;
  overflow-y: auto;
 width:500px;
//overflow-wrap: anywhere ;
hyphens:auto;
  border-style: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
  & {
    ${draftJsCss}
  }
  @media (max-width: 736px) {
    width: 100%;
  }
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
