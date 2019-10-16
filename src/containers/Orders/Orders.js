import React, { Component } from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                //res.data holds the data that we get back from firebase, a JS object where keys are unique ids that firebase generates for us, values are individually data
                //we want to turn orders object into an array
                console.log(res.data)
                const fetchedOrders = [];
                for (let key in res.data) {
                    //push res.data for a given key
                    //id is the key created by firebase
                    fetchedOrders.push({ ...res.data[key], id: key })

                }
                this.setState({ loading: false, orders: fetchedOrders })
            })
            .catch(error => this.setState({ loading: false }))
    }
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
export default withErrorHandler(Orders, axios)