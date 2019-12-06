import React, { Component } from "react";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { connect } from "react-redux"
// import * as actionTypes from "../../store/actions/actionTypes"
import * as actions from "../../store/actions"

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

export class BurgerBuilder extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {...}
  // }
  state = {
    //would manage these two in Redux
    //local UI state - use to show loading modal  
    purchasing: false,

  };

  componentDidMount() {
    // console.log(this.props)
    // axios
    //   .get("https://olympias-burger-app.firebaseio.com/ingredients.jsom")
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  //shows us modal by setting purchasing to true, only wanna do if we're autheneticated otherwiser redirect
  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      //right before we redirect to auth page, we set it to "/checkout" bc its where user should go after
      this.props.onSetRedirectPath("/checkout")
      //use history prop to push user to /auth  page
      this.props.history.push("/auth")
    }
    //
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // const queryParams = []
    // for (let i in this.state.ingredients) {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // }
    // queryParams.push('price=' + this.state.totalPrice);
    // const queryString = queryParams.join('&')
    this.props.onInitPurchased();

    this.props.history.push(
      "/checkout",
    )

  };

  render() {

    const disabledInfo = {
      ...this.state.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
        <Spinner />
      );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            isAuth={this.props.isAuthenticated}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    //we need to pass ingredient name along with type, so we expect to get ingName in this function
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchased: () => dispatch(actions.purchaseInit()),
    onSetRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

//Our wrapped withErrorHandler component is passed to the function that connect returns us - this connects our container to store
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
