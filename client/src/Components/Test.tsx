
import React, { useEffect, useState, useContext } from "react";
import { Editor } from "draft-js";
import mediaBlockRenderer from "../entities/mediaBlockRenderer";


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
} from "draft-js";

import { EditorContext } from "../Contexts/EditorContext";

const Test = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { okToDisplay, onChange } = useContext(EditorContext);


    useEffect(() => {
        console.log("here")
        fetch("/testGet")
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data.data[0].post.convertedContent)
                const convertedState = convertFromRaw(data.data[0].post.convertedContent)

                setEditorState(EditorState.createWithContent(convertedState))
            })
    }, [])

    /*let execute = new Date ("2020-11-25T12:35:00-05:00")

   const runFunction = ()=>{

    console.log('datte', new Date)
  
                    fetch("/testGet")
                    .then((res)=> res.json())
                    .then((data)=>{
                        console.log('data',data.data[0].post.convertedContent)
                        const convertedState = convertFromRaw(data.data[0].post.convertedContent)
                        setEditorState(EditorState.createWithContent(convertedState))
                    })
    
   }

   function scheduleExecution(futureDate:any, callback:any) {
    // Set an intermediary timeout at every 1 hour interval, to avoid the
    // 32 bit limitation in setting the timeout delay
    var maxInterval = 60 * 60 * 1000;
    var now:any = new Date();

    if ((futureDate - now) > maxInterval) {
        // Wait for maxInterval milliseconds, but make
        // sure we don't go over the scheduled date
        setTimeout(
            //@ts-ignore
            function() { scheduleExecution(futureDate!); },
            Math.min(futureDate - now, maxInterval));
    } else {
        // Set final timeout
        setTimeout(callback, futureDate - now);
    }
}

// This example uses time zone UTC-5. Make sure to use the
// correct offset for your local time zone
var futureDate = new Date("2020-11-25T12:44:10-05:00");
/*scheduleExecution(futureDate, function() {
    fetch("/testGet")
                    .then((res)=> res.json())
                    .then((data)=>{
                        console.log('data',data.data[0].post.convertedContent)
                        const convertedState = convertFromRaw(data.data[0].post.convertedContent)
                        setEditorState(EditorState.createWithContent(convertedState))
                    })
});*/

    return (
        <div>
            <Editor
                readOnly={true}
                editorState={editorState}
                blockRendererFn={mediaBlockRenderer}
                onChange={onChange}
            >

            </Editor>
            <div>IM HERE</div>
        </div>
    )
}

export default Test;