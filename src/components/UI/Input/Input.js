import React from "react";
import classes from "./Input.module.css"

//function returns jsx  & checks what our input us
const input = props => {
    let inputElement = null;

    const inputClasses = [classes.InputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('textarea'):
            //inside of custom input component, don't have to worry about type
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('select'):
            inputElement = (<select
                className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>

                {props.elementConfig.options.map(option => (

                    <option key={option.value} value={option.value} >{option.displayValue}</option>
                ))}
            </select>
            );
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input;