//rcc - class component shortcut w/ snippets
//render is a lifecycle method - this is a must, where we need to return JSX code.

import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";

import Aux from "../../hoc/Aux";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      cheese: 2,
      meat: 2
    }
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
