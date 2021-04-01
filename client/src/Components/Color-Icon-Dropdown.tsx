// @ts-nocheck
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ColorIconDropDown = (props) => {


    const [color, setColor] = useState([]);

    useEffect(() => {
        setColor(props.onChooseColor)
    }, [props.onChooseColor])




    let outerDiameter = 30;
    const getSectorPath = (x, y, outerDiameter, a1, a2) => {
        const degtorad = Math.PI / 180;
        const halfOuterDiameter = outerDiameter / 2;
        const cr = halfOuterDiameter - 5;
        const cx1 = (Math.cos(degtorad * a2) * cr) + x;
        const cy1 = (-Math.sin(degtorad * a2) * cr) + y;
        const cx2 = (Math.cos(degtorad * a1) * cr) + x;
        const cy2 = (-Math.sin(degtorad * a1) * cr) + y;

        return "M" + x + " " + y + " " + cx1 + " " + cy1 + " A" + cr + " " + cr + " 0 0 1 " + cx2 + " " + cy2 + "Z";
    }

    let arrayOfPaths = [
        <path d={getSectorPath(outerDiameter / 2, outerDiameter / 2, outerDiameter, 45, 135)} fill={props.onChangeColor ? props.onChangeColor : "white"} />,
        <path d={getSectorPath(outerDiameter / 2, outerDiameter / 2, outerDiameter, 135, 225)} fill={color[0] ? color[0] : "blue"} />,
        <path d={getSectorPath(outerDiameter / 2, outerDiameter / 2, outerDiameter, 225, 315)} fill={color[1] ? color[1] : "yellow"} />,
        <path d={getSectorPath(outerDiameter / 2, outerDiameter / 2, outerDiameter, 315, 45)} fill={color[2] ? color[2] : "black"} />
    ]


    return (


        <Wrapper className="ICON WRAPPER" onClick={() => props.onClick()}>
            < StyledSVG width={outerDiameter} height={outerDiameter} >
                {arrayOfPaths.map((path, index) => (
                    <path d={path.props.d} fill={path.props.fill} key={index} />
                ))}


            </StyledSVG >
        </Wrapper>
    )
}

const Wrapper = styled.div``;


const StyledSVG = styled.svg`


`;

const StyledPath = styled.path`
:hover{
    fill:${props => props.mycolor}
}
`


export default ColorIconDropDown;