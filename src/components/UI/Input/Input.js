import React from "react";
import classes from "./Input.module.css"

//function returns jsx  & checks what our input us
const input = props => {
    let inputElement = null;
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props} />
            break;
        case ('textarea'):
            //inside of custom input component, don't have to worry about type
            inputElement = <textarea className={classes.InputElement} {...props} />
            break;
        default:
            inputElement = <input className={classes.InputElement} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input;