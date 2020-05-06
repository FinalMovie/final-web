import * as React from "react";
import {Container,Row,Col,Button} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            carts: window.localStorage.getItem("cart")!== null?JSON.parse(window.localStorage.getItem("cart")):[],
            total:0
        }
    }

    componentDidMount(){
        let total = 0;
        for(let value of this.state.carts){
            total += value.price;
        }
        this.setState({
            total:total
        })
    }
    pay(){
        this.props.history.push({ pathname: "/Pay", state: { total:this.state.total,lists:this.state.carts} })
    }
    render() {
        return (
            <React.Fragment>
                <Container>
                    <Row>
                    {
                        this.state.carts.map((value,index) => {
                            return (
                                <Col key={index}>
                                    <div className="card">
                                        <img src={value.image} height={300} width={300}/>
                                        <h1>{value.name}</h1>
                                        <p className="price">${value.price}</p>
                                        <p>{value.description}</p>
                                    </div>
                                </Col>
                                )
                            })
                        }
                    </Row>
                    <Row>
                    <Button onClick={this.pay.bind(this)}>结算：{this.state.total}</Button>
                    </Row>
                </Container>

            </React.Fragment>
        );
    }
}

export default withRouter(ShoppingCart);

