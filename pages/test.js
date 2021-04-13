import { useState } from "react"
import {
    Editor, EditorState,
    RichUtils,
    AtomicBlockUtils,
    CompositeDecorator,
    ContentState,
    convertToRaw,
    convertFromRaw,
    ContentBlock,
    DraftHandleValue,
    DraftEditorCommand,
} from "draft-js";

import editorStyles from "../styles/editorStyles"
import styled from "styled-components";

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:5000/post/602836e83431205183e04a74/test22FFFFF`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }
    /*category: "random"
    date: "13/2/2021"
    description: "sffff"
    title: "test22FFFFF"
    _id: "602836e83431205183e04a74"*/

    console.log('CONVERTED', data.data.convertedContent)
    let convertedContent = data.data.convertedContent
    return {
        props: { convertedContent }, // will be passed to the page component as props
    }
}
const Test = (data) => {
    console.log('data', data)
    const link = (props) => {
        const { url } = props.contentState.getEntity(props.entityKey).getData();
        return <a href={url}>{props.children}</a>;
    };
    const findLinkEntities = (
        contentBlock,
        callback,
        contentState
    ) => {
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
    const [editorState, setEditorState] = useState(EditorState.createWithContent(data, decorator));


    return <Wrapper className="IM HERE"><EditorWrapper className="EDITORWRAPPER" >
        <Editor
            readOnly={true}
            editorState={editorState}
            onChange={setEditorState}
        ></Editor>
    </EditorWrapper>
    </Wrapper>
}


const Wrapper = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;

  @media (max-width: 736px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
`;


const EditorWrapper = styled.div`
  height: 250px;
  overflow-y: auto;
 width:500px;
//overflow-wrap: anywhere ;
hyphens:auto;
  border-style: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
  & {
    ${editorStyles}
  }
  @media (max-width: 736px) {
    width: 100%;
    height: 75%;
  }
`;

export default Test