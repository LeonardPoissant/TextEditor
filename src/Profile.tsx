import React from "react";
import styled from "styled-components";

import UnderConstruction from "./Assets/UnderConstruction.jpg";

const Profile = () => {
  return (
    <Wrapper>
      <img src={UnderConstruction}></img>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  height: 80vh;
`;

export default Profile;
