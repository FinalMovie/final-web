import * as React from "react";
import {Button, Col, FormControl, InputGroup, Row} from 'react-bootstrap';
import './PayPage.css';
import axios from "axios";
import {notification} from "antd";

export default class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            lists: [],
            payFlag: false,
            details: [],
        }
    }

    componentDidMount() {
        console.log(this.props.location.state.total, this.props.location.state.lists)
        let movieList = [];
        let foodList = [];
        for (let value of this.props.location.state.lists) {
            if (value["type"] === "movie") {
                movieList.push(value);
            } else {
                foodList.push(value);
            }
        }

        this.setState({
            total: this.props.location.state.total,
            lists: this.props.location.state.lists,
            movieList: movieList,
            foodList: foodList
        })
    }

    paySubmit() {
        console.log(this.props.location.state.total, this.props.location.state.lists)
        this.setState({
            payFlag: true,
            start_time: window.localStorage.getItem("start_time"),
            username: window.localStorage.getItem("username"),
            movie_name: window.localStorage.getItem("movie_name")
        })
        axios.get(`/api/pay?amount=${this.state.total}`).then(res => {
            if (res.data.success) {
            } else {
            }
        })
        notification['success']({
            message: 'Payment Submitted!',
        });
        let formData = new FormData();
        formData.append("email", window.localStorage.getItem("email"));
        formData.append("cart", window.localStorage.getItem("cart"));
        axios.post("/api/sendEmail", formData).then(res => {
            if (res.status === 200 && res.data.success) {
                notification['success']({
                    message: 'Success!',
                });
            } else {
                notification['error']({
                    message: res.data.msg ? res.data.msg : 'Error',
                });
            }
        })
        window.localStorage.setItem("cart", JSON.stringify([]))
    }

    render() {


        return (
            <React.Fragment>

                <div className="container-md">
                    <div className="card">
                        <div className="card-header"><strong className="paymentInfo">Payment Info</strong>
                            <img className="img-responsive cc-img"
                                 src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png" height={50}
                                 width={260} alt=""/>
                        </div>
                        <div className="card-body">
                            <Row>
                                <Col>
                                    <div align="left">
                                        <label><strong>Card Number</strong></label>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            {/*<InputGroup.Text id="basic-addon1">Total：{this.state.total}</InputGroup.Text>*/}
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Credit Card"
                                            aria-label="card number"
                                            aria-describedby="basic-addon1"
                                        /> <span className="oi oi-credit-card"/>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div align="left">
                                        <label><strong>Expiration Date</strong></label>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="MM/YY"
                                            // aria-label="card number"
                                            // aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <div align="left">
                                        <label><strong>CV Code</strong></label>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="CVC"
                                            // aria-label="card number"
                                            aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                    <div align="left">
                                        <label><strong>Cardholder name</strong></label>
                                    </div>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder="Name on Card"
                                            // aria-label="card number"
                                            // aria-describedby="basic-addon1"
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Button onClick={this.paySubmit.bind(this)}>Submit</Button>
                            </Row>
                            <Row>
                                {
                                    this.state.payFlag ?
                                        // <p>尊敬的{this.state.username},您的电影{
                                        //         this.state.movieList.map((value,index)=>{
                                        //             return value.name+","+"在"+value.start_time+"时间开始播放;"
                                        //         })
                                        //     },订购食品：
                                        //     {
                                        //         this.state.foodList.map((value,index)=>{
                                        //             return value.name+","
                                        //         })
                                        //     }
                                        //     <span>总价为：{this.state.total},订购成功，感谢支持！</span>
                                        // </p>
                                        <p> Dear {this.state.username}, you have paid {this.state.total} USD</p>
                                        :
                                        ""
                                }
                            </Row>

                        </div>

                    </div>
                </div>


            </React.Fragment>
        );
    }
}
