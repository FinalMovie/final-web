import * as React from "react";
import {Container,Row,Col,Button,InputGroup,FormControl } from 'react-bootstrap';

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
        this.setState({
            total:this.props.location.state.total,
            lists:this.props.location.state.lists
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
                <Container>
                    <Row>
                        <Col>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">总价：{this.state.total}</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="银行卡号"
                            aria-label="card number"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Button onClick={this.paySubmit.bind(this)}>提交</Button>
                    </Row>
                    <Row>
                    {
                        this.state.payFlag?
                        <p>尊敬的{this.state.username},您的电影{this.state.movie_name},在{this.state.start_time}时间开始播放,订购食品： 
                            {
                                this.state.lists.map((value,index)=>{
                                    return value.name+","
                                })
                            }
                            <span>总价为：{this.state.total},订购成功，感谢支持！</span>
                        </p>
                        :
                        ""
                    }
                    </Row>
            </Container>
            </React.Fragment>
        );
    }
}
