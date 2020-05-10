import * as React from "react";
import {Button, Col, Container, Dropdown, DropdownButton, Modal, Row} from "react-bootstrap";
import axios from "axios";
import {withRouter} from "react-router-dom";


class Staff extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            foodList: [],
            list: [],
            show: false,
            isDateSelected:false,//check if the date is being selected
            selectedTime:"",
            scheduleInfo: [],
            carts: window.localStorage.getItem("cart")!== null?JSON.parse(window.localStorage.getItem("cart")):[],
            total:0,
            subtotal:0,
            user: {
                email: ''
            }

        };
        this.handleSelectDate = this.handleSelectDate.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }

    pay(){
        this.props.history.push({ pathname: "/Pay", state: { total:this.state.subtotal,lists:this.state.carts} })
    }

    componentDidMount() {
        axios.get("/api/foodList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({foodList: res.data.data});
                console.log(res.data.data);
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
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

        let total = 0;
        for(let value of this.state.carts){
            total += value.price;
        }
        this.setState({
            total:total.toFixed(2),
            subtotal: (total * 0.0625 + total).toFixed(2)
        })

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

    addFoodToCart(value) {
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

        if (movieInfo[2] <= 0){
            alert("Tickets sold out");
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

    handleChangeEmail(event) {
        event.preventDefault();
        let email = event.target.value;
        console.log(email);
        this.setState({
            user: {
                ...this.state.user,
                email: email
            }
        })
    }

    staffSubmit(){
        let email = this.state.user.email;
        console.log(email);
        let formData = new FormData();
        formData.append("email",email);
        let header = {
            headers: {'content-type': 'multipart/form-data'}
        };
        if(email !== undefined && email.length !== 0){
            axios.post("/api/userByEmail",formData,header).then(res=>{
                console.log(res.data);
                if(res.status === 200){
                    this.setState({
                        userMembership: res.data.membership
                    })
                }else{
                    alert("server is busy now!")
                }
            }).then(res=>{

                let discount = 1
                if(this.state.userMembership >= 100 < 200){
                    discount = 0.9;
                    this.setState({
                        discountPassdown:0.9
                    })
        
                } else if( this.state.userMembership >= 200) {
                    discount = 0.8;
                    this.setState({
                        discountPassdown:0.8
                    })
                }
                let total = 0;
                for(let value of JSON.parse(window.localStorage.getItem("cart"))){
                    total += value.price;
                }
                this.setState({
                    total:total.toFixed(2),
                    subtotal: (total * discount + total * 0.075).toFixed(2)
                })
            })
        }else{
            alert("pleast input user email!")
        }

    }

    render() {
        return (
            <React.Fragment>

                <Container>
                    <table className="table table-hover table-active">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope ="col">Calories</th>
                            <th scope ="col">Image</th>
                            <th scope ="col"></th>
                        </tr>
                        </thead>
                       <tbody>
                       {
                           this.state.foodList.map((value,index) =>{
                               return (
                                   <tr key={index}>
                                       <th>{value.id}</th>
                                       <th>{value.name}</th>
                                       <th>${value.price}</th>
                                       <th>{value.calories}</th>
                                       <th><img src={value.image} height={90} width={90}/></th>
                                       <th> <button onClick={this.addFoodToCart.bind(this,value)}>Add</button></th>
                                   </tr>
                               )
                           })
                       }
                       </tbody>
                   </table>


                    <table className="table table-hover table-active">
                        <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope ="col">Description</th>
                            <th scope ="col">Image</th>
                            <th scope ="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.list.map((value,index) => {
                                return (
                                    <tr key={index}>
                                       <th>{value.id}</th>
                                        <th>{value.name}</th>
                                        <th>{value.price}</th>
                                        <th>{value.description}</th>
                                        <th> <img src={value.image} height={100} width={100}/></th>
                                        <th> <button onClick={this.handleShowModal.bind(this,value)}>Add</button></th>
                                        <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Select the time</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <DropdownButton id="dropdown-item-button" title="Available Time">
                                                    <Dropdown.Item as="button" eventKey="10:00AM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 10:00AM</Dropdown.Item>
                                                    <Dropdown.Item as="button" eventKey="11:00AM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 11:00AM</Dropdown.Item>
                                                    <Dropdown.Item as="button" eventKey="13:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 13:00PM</Dropdown.Item>
                                                    <Dropdown.Item as="button" eventKey="14:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 14:00PM</Dropdown.Item>
                                                    <Dropdown.Item as="button" eventKey="15:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 15:00PM</Dropdown.Item>
                                                    <Dropdown.Item as="button" eventKey="16:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 16:00PM</Dropdown.Item>
                                                    <Dropdown.Item as="button" eventKey="17:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 17:00PM</Dropdown.Item>
                                                    <Dropdown.Item as="button" eventKey="18:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>{new Date().getUTCFullYear()}-{new Date().getUTCMonth() + 1}-{new Date().getDate()} 18:00PM</Dropdown.Item>
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
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                    <div align="left">
                        <p> Customer Email: </p>
                        <input type="text"
                               className="form-control"
                               name="email"
                               value={this.state.user.email}
                               onChange={this.handleChangeEmail}
                        />
                        <button onClick={this.staffSubmit.bind(this)}>Submit</button>
                    </div>
                    <div align="right">
                        <Row className="form-check">
                            <p>Subtotal: {this.state.total} USD</p>
                            <p>Tax: 7.5%</p>
                            <p>Total: {this.state.subtotal} USD</p>
                            <Button onClick={this.pay.bind(this)}>CHECKOUT</Button>
                        </Row>
                    </div>
                </Container>


            </React.Fragment>
        );
    }
}
export default withRouter(Staff);
