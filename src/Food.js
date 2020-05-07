import * as React from "react";
import axios from "axios";
import {Table} from 'react-bootstrap';
import {Container,Row,Col} from 'react-bootstrap';

export default class Food extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        axios.get("/api/foodList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({list: res.data.data});
                console.log(res.data.data);
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
    }

    addToCart(value) {
        let storage = window.localStorage;
        let cart = storage.getItem("cart");
        if(cart===null){
            let cart = [];
            value["type"] = "food";
            cart.push(value);
            storage.setItem("cart",JSON.stringify(cart));
        }else{
            let cart = JSON.parse(storage.getItem("cart"));
            value["type"] = "food";
            cart.push(value);
            storage.setItem("cart",JSON.stringify(cart));
        }
        alert("Successfully Added！")
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                        {
                            this.state.list.map((value,index) =>{
                                return (
                                    <Col key={index}>
                                        <div className="card">
                                            <img src={value.image} height={300} width={300}/>
                                            <h1>{value.name}</h1>
                                            <p className="price">${value.price}</p>
                                            <p className="price">{value.calories} Calories</p>
                                            <p>
                                                <button onClick={this.addToCart.bind(this,value)}>Add to Cart</button>
                                            </p>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}
