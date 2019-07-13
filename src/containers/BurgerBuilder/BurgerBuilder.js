//rcc - class component shortcut w/ snippets
//render is a lifecycle method - this is a must, where we need to return JSX code.

import React, { Component } from "react";

import Aux from "../../hoc/Aux";

class BurgerBuilder extends Component {
  render() {
    return (
      <Aux>
        <div>Burger</div>
        <div>Build Controls</div>
      </Aux>
    );
  }
}

export default BurgerBuilder;
