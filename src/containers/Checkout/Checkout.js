import React, { Component } from "react";
import { Route } from "react-router-dom"
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData/ContactData"

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  //before render child component, we already have access to props there so we can get query params
  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search)//search includes question mark and so on
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      console.log('param', param)
      //each entry will have format ['salad', '1']
      //want to turn into obj format, turn into a number by using a plus
      if (param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }


    }
    this.setState({ ingredients: ingredients, totalPrice: price })
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
        {/*may  use match.url or match.path & it should be all part of dynamic part */}
        {/* <Route path={this.props.match.path + "/contact-data"} component={ContactData}></Route> */}
        <Route path={this.props.match.path + "/contact-data"} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)}></Route>
      </div>
    );
  }
}

export default Checkout;
