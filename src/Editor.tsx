import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  RefObject,
  ClassAttributes,
} from "react";

import { Link } from "react-router-dom";
import { Editor } from "draft-js";
import styled from "styled-components";

import { EditorContext } from "./Utils/EditorContext";
import ToolBar from "./ToolBar";
import mediaBlockRenderer from "./entities/mediaBlockRenderer";
import draftJsCss from "./Utils/EditorStyles";

/*declare module "react" {
  interface Attributes extends HTMLAttributes<HTMLDivElement> {
    active: boolean;
  }
}*/
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
  } = useContext(EditorContext);

  const [focus, setFocus] = useState();

  // References to the corresponding DOM nodes when new input is rendered.
  const Inputref = useRef(null) as any;

  //Keeps the focus on the input field (the Editor) when pressing a button  and creates the ref for conditional rendering

  useEffect(() => {
    Inputref.current! && Inputref.current.focus();
  });

  //onClick={setFocus} TYPE SCRIPT THE ONCLICK ON THE TEXT AREA
  const customDecorator = [
    {
      strategy: findLinkEntities,
      component: link,
    },
  ];

  return (
    <Wrapper active={active as any}>
      <ToolBar />
      {okToDisplay ? (
        <TextArea>
          <StyledEditor
            blockRendererFn={mediaBlockRenderer}
            editorState={editorState}
            onChange={onChange}
            handleKeyCommand={handleKeyCommand}
            decorators={customDecorator as any}
            ref={!active ? Inputref : null}
          ></StyledEditor>
        </TextArea>
      ) : (
        <> </>
      )}

      <LinksToPreviewAndPostDiv>
        <SeePreview to={{ pathname: "/Preview" }}>PREVIEW</SeePreview>
        <ClearContent onClick={() => clearLocalStorage()}>CLEAR</ClearContent>

        <PostContent to={"/"}>POST </PostContent>
      </LinksToPreviewAndPostDiv>
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

const StyledEditor = styled(Editor)<EditorProps>``;

const TextArea = styled.div`
  height: 250px;
  overflow-y: auto;
  width: 500px;
  border-style: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
  display: flex;
  z-index: -1;
  & {
    ${draftJsCss}
  }
  @media (max-width: 736px) {
    width: 100%;
  } ;
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
