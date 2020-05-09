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
            subtotal:0
        }
    }

    componentDidMount(){
        let total = 0;
        for(let value of this.state.carts){
            total += value.price;
        }
        this.setState({
            total:total.toFixed(2),
            subtotal: (total * 0.0625 + total).toFixed(2)
        })
    }
    pay(){
        this.props.history.push({ pathname: "/Pay", state: { total:this.state.subtotal,lists:this.state.carts} })
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

