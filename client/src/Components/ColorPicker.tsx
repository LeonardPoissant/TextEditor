// @ts-nocheck

import React from "react";

import textColor from "../Utils/InlineStyles/Colors"




const ColorDropDown = ({ onToggle }) => {


    return (<div>

        {textColor.map(color => (
            <li
                key={color.backgroundColor}
                value={color.style}
                style={{ backgroundColor: color.backgroundColor }}
                onMouseDown={(e) => onToggle(e, color.style)}
            >

            </li>
        ))
        }

    </div >)
}


export default ColorDropDown