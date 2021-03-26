// @ts-nocheck

import React from 'react';
import { secondaries } from '../../Utils/InlineStyles/ColorsV2';
import styled from "styled-components"


const SecondaryPicker = (props) => {
    const secondaryKey = props.secondaryKey;
    const colors = secondaries[secondaryKey];
    const onToggle = props.onToggle

    return (
        <Wrapper>
            {colors.palettes.map((c, i) => (
                <ColorWrapper key={i}>
                    <Color
                        key={i}
                        value={c.shade}
                        style={{ backgroundColor: c.shade }}
                        onMouseDown={(e) => onToggle(e, c.id)}
                    />
                </ColorWrapper>
            )
            )}
        </Wrapper>


    );

}

export default SecondaryPicker;

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content:space-around;
width:104px;

`;

const Color = styled.div`
border-radius:60%;
width:15px;
height:15px;
border:solid;
border-width:1px;

`;

const ColorWrapper = styled.div`
padding:2px;
`;



