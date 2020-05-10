import * as React from "react";
import {Container,Row,Col,Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            carts: window.localStorage.getItem("cart")!== null?JSON.parse(window.localStorage.getItem("cart")):[],
            total:0,
            subtotal:0,
            discountPassdown:0

        }
    }

    componentDidMount(){
        let total = 0;
        let discount = 1;
        for(let value of this.state.carts){
            total += value.price;
        }
        let storeage = window.localStorage;
        let membership = storeage.getItem("membership") === null?1: parseInt(storeage.getItem("membership"))

        if(membership >= 100 < 200){
            discount = 0.9;
            this.setState({
                discountPassdown:0.9
            })

        } else if( membership >= 200) {
            discount = 0.8;
            this.setState({
                discountPassdown:0.8
            })
        }
        this.setState({
            total:total.toFixed(2),
            subtotal: (total * discount + total * 0.075).toFixed(2)
        })
    }
    pay(){
        this.props.history.push({ pathname: "/Pay", state: { total:this.state.subtotal,lists:this.state.carts} })
    }

    deleteCarts(value){
        console.log(value);
        let storeage = window.localStorage;
        let carts = JSON.parse(storeage.getItem("cart"));
        console.log(typeof(carts));
        let newCarts = [];
        console.log(carts);
        for(let _value of carts){
            console.log(_value);
            if(value.id != _value.id && value.name != _value.name){
                newCarts.push(_value);
            }
        }
        storeage.setItem("cart",JSON.stringify(newCarts));
        this.setState({
            carts: newCarts
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-md">
                    <h2 align="center">CHECK OUT</h2>
                    <Row>
                        <table className="table table-striped">
                            <thead className="table-secondary">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope ="col">Info</th>
                                <th scope ="col">Image</th>
                                <th scope ="col">Operate</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.carts.map((value,index) => {
                                    return (
                                        <tr>
                                            <th>{index + 1}</th>
                                            <th>{value.name}</th>
                                            <th>${value.price}</th>
                                            <th>{ window.localStorage.getItem("start_time")}</th>
                                            <th>{<img src={value.image} height={100} width={100}/>}</th>
                                            <th><button onClick={this.deleteCarts.bind(this,value)}>delete</button></th>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </Row>
                    <div align="right">
                        <Row className="form-check">
                            <p>Subtotal: {this.state.total} USD</p>
                            <p>Tax: 7.5%</p>
                            <p>Membership Discount: {(this.state.total - this.state.total * this.state.discountPassdown).toFixed(2)} USD</p>
                            <p>Total: {this.state.subtotal} USD</p>
                            <Button onClick={this.pay.bind(this)}>CHECKOUT</Button>
                        </Row>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(ShoppingCart);

