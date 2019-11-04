import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input"
import Button from "../../../components/UI/Button/Button"
import Spinner from "../../../components/UI/Spinner/Spinner"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: "Your Name"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: "Street"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: "ZIP"
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: "Country"
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email', placeholder: "Your Email"
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: "fastest", displayValue: "Fastest" }, { value: "cheapest", displayValue: "Cheapest" }]
                },
                value: '',
                validation: {},
                valid: true
            },
        },
        loading: false,
        formIsValid: false
    }


    orderHandler = (e) => {
        //since this is a form, prevent default which is to send req and reload page
        e.preventDefault();
        // console.log('ingredients', this.props.ingredients)
        //with ingredients being passed from Checkout via props, submitting request is easy
        alert('You continue!');
        this.setState({ loading: true });

        //get name and value directly mapped to eachother
        const formData = {};
        for (let formElementIdentifer in this.state.orderForm) {
            formData[formElementIdentifer] = this.state.orderForm[formElementIdentifer].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        };
        axios
            .post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({ loading: false });
            });

    }

    // Returns true or false determining whether valid or not

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }
        //only last rule satisfied to turn isValid to true
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    //We also check for validity here
    inputChangedHandler = (event, inputIdentifier) => {
        // [e.target.name] = e.target.value
        //create copy of form data
        const updatedOrderForm = { ...this.state.orderForm }
        //email or delivery method, get access to inner object
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value
        //update valid value

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)

        updatedFormElement.touched = true
        updatedOrderForm[inputIdentifier] = updatedFormElement

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;

        }

        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid })
    }

    //turn orderFOrm object into something that we can loop through
    render() {
        const formElementsArray = []
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        console.log(formElementsArray, 'form')

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map((formElement) => (
                    <Input changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        value={formElement.config.value} />
                ))}
                {/* Disabled is true if form is not valid*/}
                <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {/* this either renders form or spinner*/}
                {form}
            </div>
        )
    }

}

export default ContactData