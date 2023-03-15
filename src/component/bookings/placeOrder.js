import React, { Fragment, Component } from 'react';
import Header from '../../header'
import './placeOrder.css';

const url = "https://foodscapenodeapi-production.up.railway.app/menuItem";
const postData = "https://foodscapenodeapi-production.up.railway.app/placeOrder"


class PlaceOrder extends Component {
    constructor(props) {
        super(props);

        let userData = sessionStorage.getItem('userInfo')
        let oAuthname = sessionStorage.getItem('oAuthname')
        let email = sessionStorage.getItem('email')

        this.state = {
            id: Math.floor(Math.random() * 100000),
            Rest_name: this.props.match.params.restName,
            name: userData ? userData.split(',')[1] : '' || oAuthname,
            email: userData ? userData.split(',')[2] : '' || email,
            cost: 0,
            phone: userData ? userData.split(',')[3] : '',
            address: '',
            menuItem: '',
            quantity: '',
            counter: ''
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    checkout = () => {
        let obj = this.state;
        obj.menuItem = sessionStorage.getItem('menu');

        fetch(postData, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
            .then(console.log('Order placed.'))
    }

    renderMenu = (data) => {
        if (data) {
            return data.map((item) => {
                for (const key in this.state.counter) {
                    if (this.state.counter.hasOwnProperty(key)) {
                        if (item.menu_id == key) {
                            return console.log("QuantText", this.state.counter[key])
                        }
                    }
                }
                return (
                    <center>
                        <div className="orderItems" key={item.menu_id}>
                            <img src={item.menu_image} alt={item.menu_name} />
                            <h3>{item.menu_name}</h3>
                            <h4>Rs. {item.menu_price}</h4>
                        </div>
                    </center>
                )
            })
        }
    }


    render() {
        if (sessionStorage.getItem('loginStatus') === 'loggedIn') {
            if (sessionStorage.getItem('menu') === '""') {
                return (
                    <Fragment>
                        <Header />
                        <center>
                            <h2 style={{ color: '#8e97a7' }}>Please place order of atleast one item to view this page</h2>
                        </center>
                    </Fragment>
                )
            }
            else {
                return (
                    <>
                        <Header />
                        <div className="container" id="formContainer">
                            &nbsp; &nbsp;
                            <div className="panel panel-info">
                                <div className="panel-heading">
                                    <h3>Your Order from Restaurant: {this.props.match.params.restName} </h3>
                                </div>
                                <div className="panel-body">
                                    <form action="https://foodscapepayment-production.up.railway.app/paynow" method="POST">
                                        <input type="hidden" name="cost" value={this.state.cost} />
                                        <input type="hidden" name="id" value={this.state.id} />
                                        <input type="hidden" name="Rest_name" value={this.state.Rest_name} />
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label for="fname">Name</label>
                                                <input id="fname" name="name" className="form-control"
                                                    value={this.state.name} onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="email">Email</label>
                                                <input id="email" name="email" className="form-control"
                                                    value={this.state.email} onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="phone">Phone</label>
                                                <input id="phone" name="phone" className="form-control"
                                                    value={this.state.phone} onChange={this.handleChange} />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label for="address">Address</label>
                                                <input id="address" name="address" className="form-control"
                                                    value={this.state.address} onChange={this.handleChange} />
                                            </div>
                                        </div>
                                        {this.renderMenu(this.state.menuItem)}
                                        <div className="row">
                                            <div className="col-md-12">
                                                <center>
                                                    <h2>Total Amount Payable is Rs.{this.state.cost}</h2>
                                                </center>
                                            </div>
                                        </div>
                                        <center>
                                            <button className="btn btn-success" onClick={this.checkout} type="submit">Submit</button>
                                        </center>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </>
                )

            }
        } else {
            return (
                <>
                    <Header />
                    <center>
                        <h2 style={{ color: '#8e97a7' }}>Login First To Place Order!</h2>
                    </center>
                </>
            )
        }
    }


    componentDidMount() {
        let menuItem = sessionStorage.getItem('menu');
        console.log("menuItem", menuItem)

        let orderId = []
        let menuOrder = JSON.parse(menuItem)
        console.log("Array", menuOrder)
        let quantity = {}
        if (menuItem == '""') {
            return "ok";
        } else {
            menuOrder.reduce((item, curr) => {
                if (item[curr]) {
                    item[curr] = ++item[curr]
                } else {
                    item[curr] = 1
                }

                return item
            }, quantity)
        }

        menuItem.split(`[`)[1].split(`]`)[0].split(',').map((item) => {
            console.log("Item now", item)
            orderId.push(parseInt(item));
            return 'ok';
        })

        fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderId)
        })
            .then((res) => res.json())
            .then((data) => {
                let totalPrice = 0;
                data.map((item) => {
                    for (const num in quantity) {
                        if (quantity.hasOwnProperty(num)) {
                            if (item.menu_id == num) {
                                console.log(`${[num]}:${quantity[num]}`)
                                totalPrice += parseFloat(item.menu_price) * quantity[num];
                                sessionStorage.setItem("Count", JSON.stringify({ [num]: quantity[num] }))

                            }
                        }
                    }
                })

                this.setState({ cost: totalPrice, menuItem: data })
            })
    }

}

export default PlaceOrder;