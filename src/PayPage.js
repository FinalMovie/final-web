import * as React from "react";
import {Container,Row,Col,Button,InputGroup,FormControl } from 'react-bootstrap';
import './PayPage.css';

export default class Pay extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            total: 0,
            lists: [],
            payFlag:false,
            details:[],
        }
    }

    componentDidMount(){
        console.log(this.props.location.state.total,this.props.location.state.lists)
        let movieList = [];
        let foodList = [];
        for(let value of this.props.location.state.lists){
            if(value["type"]==="movie"){
                movieList.push(value);
            }else{
                foodList.push(value);
            }
        }
        
        this.setState({
            total:this.props.location.state.total,
            lists:this.props.location.state.lists,
            movieList: movieList,
            foodList: foodList
        })
    }

    paySubmit(){
        console.log(this.props.location.state.total,this.props.location.state.lists)
        this.setState({
            payFlag:true,
            start_time: window.localStorage.getItem("start_time"),
            username: window.localStorage.getItem("username"),
            movie_name: window.localStorage.getItem("movie_name")
        })
    }

    render() {


        return (
            <React.Fragment>
            {/*    <Container>*/}
            {/*        <Row>*/}
            {/*            <Col>*/}
            {/*            <InputGroup className="mb-3">*/}
            {/*                <InputGroup.Prepend>*/}
            {/*                    <InputGroup.Text id="basic-addon1">Total：{this.state.total}</InputGroup.Text>*/}
            {/*                </InputGroup.Prepend>*/}
            {/*                <FormControl*/}
            {/*                placeholder="Credit Card"*/}
            {/*                aria-label="card number"*/}
            {/*                aria-describedby="basic-addon1"*/}
            {/*                />*/}
            {/*            </InputGroup>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*        <Row>*/}
            {/*            <Button onClick={this.paySubmit.bind(this)}>Submit</Button>*/}
            {/*        </Row>*/}
            {/*        <Row>*/}
            {/*        {*/}
            {/*            this.state.payFlag?*/}
            {/*            <p>尊敬的{this.state.username},您的电影{this.state.movie_name},在{this.state.start_time}时间开始播放,订购食品： */}
            {/*                {*/}
            {/*                    this.state.lists.map((value,index)=>{*/}
            {/*                        return value.name+","*/}
            {/*                    })*/}
            {/*                }*/}
            {/*                <span>总价为：{this.state.total},订购成功，感谢支持！</span>*/}
            {/*            </p>*/}
            {/*            :*/}
            {/*            ""*/}
            {/*        }*/}
            {/*        </Row>*/}
            {/*</Container>*/}
            <div className="container-md">
                <div className="card">
                    <div className="card-header"><strong className="paymentInfo">Payment Info</strong>
                        <img className="img-responsive cc-img"
                             src="http://www.prepbootstrap.com/Content/images/shared/misc/creditcardicons.png" height={50} width={260}/>
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
                                        /> <span className="oi oi-credit-card"></span>
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
                                    this.state.payFlag?
                                    <p>尊敬的{this.state.username},您的电影{
                                            this.state.movieList.map((value,index)=>{
                                                return value.name+","+"在"+value.start_time+"时间开始播放;"
                                            })
                                        },订购食品：
                                        {
                                            this.state.foodList.map((value,index)=>{
                                                return value.name+","
                                            })
                                        }
                                        <span>总价为：{this.state.total},订购成功，感谢支持！</span>
                                    </p>
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
