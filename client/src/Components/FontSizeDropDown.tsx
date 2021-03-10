// @ts-nocheck

import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import fontSizeStyle from "../Utils/InlineStyles/FontSize"

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        maxWidth: 90,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const FontSizeDropDown = ({ onToggle }) => {
    const classes = useStyles();


    /*
      <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">Font-Size</InputLabel>
                <ul
                    native
                    label="font-size"
                    inputProps={{
                        name: 'age',
                        id: 'filled-age-native-simple',
                    }}
    
                >
                    {fontSizeStyle.map(fontSize => (
                        <button
                            key={fontSize.label}
                            value={fontSize.style}
                            onMouseDown={() => onToggle(fontSize.style)}
    
    
    
                        >{fontSize.label}</button>
    
                    ))}
    
    
                </ul>
            </FormControl>
    
    
    
    
    
    */


    return (
        <div>

            <ul


            >
                {fontSizeStyle.map(fontSize => (
                    <li
                        key={fontSize.label}
                        value={fontSize.style}
                        onMouseDown={(e) => onToggle(e, fontSize.style)}




                    >{fontSize.label}</li>

                ))}


            </ul>
        </div>

    )
}


export default FontSizeDropDown