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
            show: false,
            isDateSelected:false,//check if the date is being selected
            selectedTime:"",
            scheduleInfo:[]
        };
        this.handleSelectDate = this.handleSelectDate.bind(this);
    }

    componentDidMount() {
        let storage = window.localStorage;
        console.log(storage.getItem("islogin"));
        if(storage.getItem("islogin") !== 'true'){
            alert("Please Login First！");
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
            value["type"] = "movie";
            value["start_time"] = this.state.selectedTime;
            cart.push(value);
            storage.setItem("cart",JSON.stringify(cart));
            console.log(111);
        }else{
            console.log(222);
            value["type"] = "movie";
            value["start_time"] = this.state.selectedTime;
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

    handleClose(){
        this.setState({
            show:false,
            isDateSelected:false
        })
    }

    handleShowModal(value){
        console.log(value);
        axios.get("/api/movieSchedule?id="+value.id).then(res=>{
            if(res.data.success){
                this.setState({
                    scheduleInfo: res.data.data
                })
                console.log(res.data.data);
            }else{
                this.setState({
                    scheduleInfo:[]
                })
            }
        }).then(res=>{
            this.setState({
                show:true
            })
        })
    }

    handleSelectDate(value){
        console.log(value);
        let movieInfo = value.split("@");
        // 超卖判断
        if (movieInfo[2] <= 0){
            alert("该场次电影已经无票了");
            return false
        }else{
            let storage = window.localStorage;
            storage.setItem("start_time",value);
            this.setState({
                isDateSelected:true,
                selectedTime: movieInfo[0]
            })
        }
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
                                            <Button onClick={this.handleShowModal.bind(this,value)}>Add to Cart</Button>
                                        </p>
                                    </div>
                                    <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                                        <Modal.Header closeButton>
                                        <Modal.Title>Select the time</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <DropdownButton id="dropdown-item-button" title="Available Time">
                                            {
                                                this.state.scheduleInfo.map((value,index)=>{
                                                    return (
                                                        <Dropdown.Item as="button" key={index} eventKey={value.startTime+"@"+value.movie.name+"@"+value.room.capacity} onSelect={(key)=>{this.handleSelectDate(key)}}>
                                                            {value.startTime}
                                                        </Dropdown.Item>
                                                    )
                                                })
                                            }
                                            {/* <Dropdown.Item as="button" eventKey="2020-01-01 15:30" onSelect={(key)=>{this.handleSelectDate(key)}}>2020-01-01 15:30</Dropdown.Item>
                                            <Dropdown.Item as="button" eventKey="2020-01-02 15:30" onSelect={(key)=>{this.handleSelectDate(key)}}>2020-01-02 15:30</Dropdown.Item>
                                            <Dropdown.Item as="button" eventKey="2020-01-03 15:30" onSelect={(key)=>{this.handleSelectDate(key)}}>2020-01-03 15:30</Dropdown.Item> */}
                                        </DropdownButton>
                                            {
                                                this.state.isDateSelected ?
                                                    <Modal.Title>Time Selected: {this.state.selectedTime}</Modal.Title>
                                                    :
                                                    ""
                                            }
                                        </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose.bind(this)}>
                                            Cancel
                                        </Button>
                                        <Button variant="primary" onClick={this.addToCart.bind(this,value)}>
                                            Add
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
