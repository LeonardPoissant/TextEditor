// @ts-nocheck

import React, { useState, useContext } from "react"
import { BlockPicker } from "react-color"

import { EditorContext } from "../Contexts/EditorContext"

const ColorPicker = () => {

    const {
        state,
        handleChangeComplete
    } = useContext(EditorContext);









    return (<div>

        <BlockPicker

            color={state.background}
            onChange={handleChangeComplete}
        ></BlockPicker>

    </div>)
}

export default ColorPicker;