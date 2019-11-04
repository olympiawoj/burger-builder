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
                    type: 'text', placeholder: "Your Name"
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: "Street"
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: "ZIP"
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text', placeholder: "Country"
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email', placeholder: "Your Email"
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: "fastest", displayValue: "Fastest" }, { value: "cheapest", displayValue: "Cheapest" }]
                },
                value: ''
            },
        }
    }

    orderHandler = (e) => {
        //since this is a form, prevent default which is to send req and reload page
        e.preventDefault();
        console.log('ingredients', this.props.ingredients)
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

    inputChangedHandler = (event, inputIdentifier) => {
        // [e.target.name] = e.target.value
        //create copy of form data
        const updatedOrderForm = { ...this.state.orderForm }
        //email or delivery method, get access to inner object
        const updatedFormElement = { ...updatedOrderForm[inputIdentifier] }
        updatedFormElement.value = event.target.value
        updatedOrderForm[inputIdentifier] = updatedFormElement
        this.setState({ orderForm: updatedOrderForm })
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
                    <Input changed={(event) => this.inputChangedHandler(event, formElement.id)} key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} />
                ))}
                <Button btnType="Success" >ORDER</Button>
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