import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input"
import Button from "../../../components/UI/Button/Button"
import Spinner from "../../../components/UI/Spinner/Spinner"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"


class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (e) => {
        //since this is a form, prevent default which is to send req and reload page
        e.preventDefault();
        console.log('ingredients', this.props.ingredients)
        //with ingredients being passed from Checkout via props, submitting request is easy
        alert('You continue!');
        this.setState({ loading: true });
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Olympia",
                address: {
                    street: "Teststreet 1",
                    zipCode: "41351",
                    country: "Germany"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
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

    render() {

        let form = (
            <form>
                <Input inputtype="input" type="text" name="email" placeholder="Your Email" />
                <Input inputtype="input" type="text" name="name" placeholder="Your Name" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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