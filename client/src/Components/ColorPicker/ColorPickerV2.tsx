// @ts-nocheck
import React, { useState, useContext } from 'react';
import { primaries } from '../../Utils/InlineStyles/ColorsV2';
import styled from "styled-components"
import SecondaryPicker from './SecondaryPicker';
import { EditorContext } from "../../Contexts/EditorContext"

const ColorPickerV2 = (props) => {
    const {
        selectedIndex,
        setSelectedIndex
    } = useContext(EditorContext);

    const onToggle = props.onToggle

    return (
        <Wrapper>
            <PrimaryColorsWrapper  >
                {primaries.map((c, i) => (
                    <ColorWrapper
                        key={i}
                    >
                        <Circle
                            key={i}
                            style={{ backgroundColor: c.shade }}
                            onClick={() => setSelectedIndex(i)}
                        > </Circle>
                    </ColorWrapper>
                ))}
            </PrimaryColorsWrapper >
            <SecondaryPicker
                onToggle={onToggle}
                secondaryKey={primaries[selectedIndex].id}
            />
        </Wrapper>
    );

}

export default ColorPickerV2;

const Wrapper = styled.div`
display: flex;
width:500px;

position:absolute;
justify-content:space-around;
margin-left:-484px;

margin-top:47px;
`;


const PrimaryColorsWrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content:space-around;
width:104px;

`;


const Circle = styled.div`
border-radius:60%;
width:15px;
height:15px;
border:solid;
border-width:1px;

`;

const ColorWrapper = styled.div`
padding:2px;
`;




