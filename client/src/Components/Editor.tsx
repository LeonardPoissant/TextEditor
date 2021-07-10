// @ts-nocheck

import React, { useEffect, useRef, useContext } from "react";
import { useSpring, animated, config } from 'react-spring'

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

  window.__DRAFT_GKX = {
    draft_killswitch_allow_nontextnodes: true,
  }


  return (



    <Wrapper active={active as any} className="RichEditor-root" required>
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
            placeholder="Write something nice..."
            ref={editor}
            spellCheck={true}
          ></StyledEditor>
        </TextArea>
      ) : (
        <> </>
      )}

      <LinksToPreviewAndPostDiv>
        <ClearContent onClick={() => clearLocalStorage()}>CLEAR</ClearContent>
        <SeePreview to={{ pathname: "/Preview" }}>PREVIEW</SeePreview>
      </LinksToPreviewAndPostDiv>
    </Wrapper>

  );
};

const Wrapper = styled.div<WrapperProps>`
margin-left: 420px;
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
  @keyframes drawing {
    0% {border-bottom-color: #19f6e8};
    25%{border-right-color: #19f6e8;
      border-left-color: #19f6e8}
      50% {border-top-color: #19f6e8};
      75%{border-top-color: #19f6e8;
        border-right-color: #19f6e8
      }
      80%{
        border-left-color: #19f6e8;
        border-bottom-color:#19f6e8;
      }
    
}
animation:  drawing  1s linear forwards;

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
