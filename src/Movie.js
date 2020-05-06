import * as React from "react";
import axios from "axios";
import {Link,withRouter} from "react-router-dom";
import {Container,Row,Col,Modal,Button,DropdownButton,Dropdown} from 'react-bootstrap';

import "./Movie.css";


class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            show: false
        };
        this.handleSelectDate = this.handleSelectDate.bind(this);
    }

    componentDidMount() {
        let storage = window.localStorage;
        console.log(storage.getItem("islogin"));
        if(storage.getItem("islogin") !== 'true'){
            alert("请登陆！");
            this.props.history.push("/Login");
        }else{
            axios.get("/api/movieList").then(res => {
                console.log(res.data)
                if (res.data.success) {
                    this.setState({list: res.data.data});
                } else {
                    alert("FAILED to LOAD DATA！");
                }
            })
        }
    }

    addToCart(value) {
        let storage = window.localStorage;
        let cart = storage.getItem("cart");
        if(cart===null){
            let cart = [];
            cart.push(value);
            storage.setItem("cart",JSON.stringify(cart));
            console.log(111);
        }else{
            console.log(222);
            let cart = JSON.parse(storage.getItem("cart"));
            cart.push(value);
            storage.setItem("cart",JSON.stringify(cart));
        }
        this.setState({
            show:false
        })
        storage.setItem("movie_name",value.name)
        // this.props.functionCallFromParent();
    }
    handleColse(){
        this.setState({
            show:false
        })
    }
    handleShowModal(){
        this.setState({
            show:true
        })
    }
    handleSelectDate(value){
        console.log(value);
        let storage = window.localStorage;
        storage.setItem("start_time",value);
    }
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                    {
                        this.state.list.map((value,index) => {
                            return (
                                <Col key={index}>
                                    <div className="card">
                                        <img src={value.image} height={300} width={300}/>
                                        <h1>{value.name}</h1>
                                        <p className="price">${value.price}</p>
                                        <p>{value.description}</p>
                                        <p>
                                            <Button onClick={this.handleShowModal.bind(this)}>Add to Cart</Button>
                                            {/* <button onClick={this.addToCart.bind(this,value)}>Add to Cart</button> */}
                                        </p>
                                    </div>
                                    <Modal show={this.state.show} onHide={this.handleColse.bind(this)}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>选择电影场次</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <DropdownButton id="dropdown-item-button" title="可选择的时间场次">
                                            <Dropdown.Item as="button" eventKey="2020-01-01 15:30" onSelect={(key)=>{this.handleSelectDate(key)}}>2020-01-01 15:30</Dropdown.Item>
                                            <Dropdown.Item as="button" eventKey="2020-01-02 15:30" onSelect={(key)=>{this.handleSelectDate(key)}}>2020-01-02 15:30</Dropdown.Item>
                                            <Dropdown.Item as="button" eventKey="2020-01-03 15:30" onSelect={(key)=>{this.handleSelectDate(key)}}>2020-01-03 15:30</Dropdown.Item>
                                        </DropdownButton>
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleColse.bind(this)}>
                                            取消
                                        </Button>
                                        <Button variant="primary" onClick={this.addToCart.bind(this,value)}>
                                            确定
                                        </Button>
                                        </Modal.Footer>
                                    </Modal>
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

export default withRouter(Movie);