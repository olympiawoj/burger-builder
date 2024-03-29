import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom"
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "./ContactData/ContactData"
import { connect } from "react-redux"

class Checkout extends Component {

  // //before render child component, we already have access to props there so we can get query params
  // componentWillMount() {
  //   const query = new URLSearchParams(this.props.location.search)//search includes question mark and so on
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()) {
  //     console.log('param', param)
  //     //each entry will have format ['salad', '1']
  //     //want to turn into obj format, turn into a number by using a plus
  //     if (param[0] === 'price') {
  //       price = param[1]
  //     } else {
  //       ingredients[param[0]] = +param[1]
  //     }


  //   }
  //   this.setState({ ingredients: ingredients, totalPrice: price })
  // }



  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data')

  }

  render() {
    //this is my redirect
    let summary = <Redirect to="/" />
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary ingredients={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler} checkoutContinued={this.checkoutContinuedHandler} />
          <Route path={this.props.match.path + "/contact-data"} component={ContactData} />
        </>);
    }

    return (
      //if used w React Router, need div
      //checkoutSummary expects to get ingredients as a prop
      //start w/ dummy data and use routing to pass ingredients late
      <div>
        {summary}
        {/*may  use match.url or match.path & it should be all part of dynamic part */}
        {/* <Route path={this.props.match.path + "/contact-data"} component={ContactData}></Route> */}

        {/* Thanks to redux store, we don't need price so we can get ri dof price prop and render method*/}

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased
  }
}



export default connect(mapStateToProps)(Checkout);
