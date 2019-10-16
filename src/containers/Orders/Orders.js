import React, { Component } from "react"
import Order from "../../components/Order/Order"

class Orders extends Component {
    render() {
        return (
            //what do we wanna render? output Orders - create new component, the Order component itself
            //orders neeeded are fetched from bacekend
            <div>
                <Order />
                <Order />
            </div>
        )
    }
}
export default Orders;