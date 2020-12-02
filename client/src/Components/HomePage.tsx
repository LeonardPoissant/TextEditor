import React, { useContext } from "react";
import { Editor } from "draft-js";
import styled from "styled-components";

import { EditorContext } from "../Utils/EditorContext";
import mediaBlockRenderer from "../entities/mediaBlockRenderer";
import draftJsCss from "../Utils/EditorStyles";

const HomePage = (props: any) => {
  const { editorState, okToDisplay, onChange } = useContext(EditorContext);

  const publish = props.location.state;



  //console.log("publish", publish.publish);

  return (
    <Wrapper>
      {publish === undefined ? (
        <>
          <p>
            Hi! Welcome to Littera Clip, a blog editor created with the draft.js
            framework.
          </p>
          <p>
            Feel free to hop in the about section to learn more about this
            project!
          </p>
        </>
      ) : (
        <EditorWrapper className="EDIWRAP">
          {okToDisplay ? (
            <Editor
              readOnly={true}
              editorState={editorState}
              blockRendererFn={mediaBlockRenderer}
              onChange={onChange}
            />
          ) : (
            <div>Loading... </div>
          )}
        </EditorWrapper>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
  padding: 20px;
  @media (max-width: 736px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;

const HomePageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding-top: 100px;
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

export default HomePage;
