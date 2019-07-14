//rcc - class component shortcut w/ snippets
//render is a lifecycle method - this is a must, where we need to return JSX code.

import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

import Aux from "../../hoc/Aux";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false
  };

  purchaseContinueHandler = () => {
    alert("you can continue");
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  //should be triggered whenever user clicks order now button
  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  //call at end of add and remove ingredient handler to check whethre we should turn purchasable to true or false
  updatePurchaseState = ingredients => {
    //turn object into an array of these values here again
    //creates array of string entries- salad, bacon, cheese, but I need amounts, not names
    //we can map this array into the one we need
    const sum = Object.keys(ingredients)
      .map(igKey => {
        //return the value for a given key - this will be the amount, accessing
        //in object
        return ingredients[igKey];
      })
      //now I have an array of values, all I need to do is then reduce array to sum
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //sum > 0 is either true or false. Its true if we have at least1 ingredient, or else its false.
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredienthandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return; //nothing happens
    }
    const updatedCount = oldCount - 1;
    //create copy of ingredients in state
    const updatedIngredients = {
      ...this.state.ingredients
    };
    //update the count for this type
    updatedIngredients[type] = updatedCount;
    //find out how much to subtract
    const priceSubtraction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    //deduct price
    const newPrice = oldPrice - priceSubtraction;
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice });
    this.updatePurchaseState(updatedIngredients);
  };

  render() {
    //creating a copy of our ingredients Object in disabled Info
    const disabledInfo = {
      ...this.state.ingredients
    };
    //loop through every key of disabledInfo
    for (let key in disabledInfo) {
      //it is the value of each KEY , check returns true or false so updates this
      //in our copied object with true or false
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    //{salad: true, meat: false, ...}

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            continue={this.purchaseContinueHandler}
            cancel={this.purchaseCancelHandler}
            price={this.state.totalPrice}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredienthandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
