import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)//search includes question mark and so on
    const ingredients = {};
    for (let param of query.entries()) {
      console.log('param', param)
      //each entry will have format ['salad', '1']
      //want to turn into obj format, turn into a number by using a plus
      ingredients[param[0]] = +param[1]

    }
    this.setState({ ingredients: ingredients })
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')

  }

  render() {
    return (
      //if used w React Router, need div
      //checkoutSummary expects to get ingredients as a prop
      //start w/ dummy data and use routing to pass ingredients late
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} />
      </div>
    );
  }
}

export default Checkout;
