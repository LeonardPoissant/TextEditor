import React from "react";

import styled from "styled-components";

const ToolBar = (props) => {
  console.log("INTOOLBAR", props);
  return (
    <Wrapper>
      {/*<ChangeStyleButton
        onMouseDown={(e) => toggleBold(e)}
        style={hasStyle ? { backgroundColor: "grey" } : { backgroundColor: "" }}
      >
        <b>B</b>
      </ChangeStyleButton>
      <ChangeStyleButton
        onMouseDown={toggleItalic}
        style={isItalic ? { backgroundColor: "grey" } : { backgroundColor: "" }}
      >
        {" "}
        <i>I</i>
      </ChangeStyleButton>
      <ChangeStyleButton
        onMouseDown={toggleUnderLine}
        style={
          isUnderline ? { backgroundColor: "grey" } : { backgroundColor: "" }
        }
      >
        <u>U</u>
    </ChangeStyleButton>*/}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 6px;
  justify-content: space-around;
  border-left: solid;
  border-top: solid;
  border-right: solid;
  border-color: rgb(161, 161, 161);
  border-width: 1px;
`;

const ChangeStyleButton = styled.button`
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

export default ToolBar;
