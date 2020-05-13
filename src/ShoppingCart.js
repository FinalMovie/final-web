import * as React from "react";
import {Container,Row,Col,Button} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';
import './ShoppingCart.css';

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            carts: window.localStorage.getItem("cart")!== null?JSON.parse(window.localStorage.getItem("cart")):[],
            total:0,
            subtotal:0,
            discountPassdown:0,
            isStaff: window.localStorage.getItem("isstaff")==="true"?true:false,

        }
    }

    componentDidMount(){
        let total = 0;
        let discount = 1;
        for(let value of this.state.carts){
            total += value.price;
        }
        let storeage = window.localStorage;
        let membership = storeage.getItem("membership") === null? 1: parseInt(storeage.getItem("membership"))

        if(membership >= 100 && membership < 200){
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
            total: (total * 0.0625 + total * discount).toFixed(2),
            subtotal: (total * 0.0625 + total).toFixed(2)
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
                                <th scope ="col"></th>
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
                                            <th><button onClick={this.deleteCarts.bind(this,value)}>
                                                <svg className="bi bi-trash-fill" width="1em" height="1em"
                                                     viewBox="0 0 16 16" fill="currentColor"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                          d="M2.5 1a1 1 0 00-1 1v1a1 1 0 001 1H3v9a2 2 0 002 2h6a2 2 0 002-2V4h.5a1 1 0 001-1V2a1 1 0 00-1-1H10a1 1 0 00-1-1H7a1 1 0 00-1 1H2.5zm3 4a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7a.5.5 0 01.5-.5zM8 5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 018 5zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z"
                                                          clip-rule="evenodd"/>
                                                </svg>
                                            </button></th>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </Row>
                    <div align="right">
                        <Row className="form-check">
                            {
                                this.state.isStaff ?
                                    ""
                                    :
                                <div>
                                    <p>Subtotal: {this.state.subtotal} USD</p>
                                    <p>Tax: 6.25%</p>
                                    {
                                        this.state.discountPassdown === 1  ?
                                            ""
                                            :
                                            <p>Membership Discount: {((1-this.state.discountPassdown) * this.state.total).toFixed(2)} USD</p>
                                    }
                                    <p>Total: {this.state.total} USD</p>
                                </div>
                            }
                            {
                                this.state.isStaff ?
                                    <Link to="/Staff">
                                        <button className="btn-primary">Back</button>
                                    </Link>
                                    :
                                    <Button onClick={this.pay.bind(this)}>CHECKOUT</Button>
                            }

                        </Row>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(ShoppingCart);

