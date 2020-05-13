import * as React from "react";
import {Button, Col, Container, Dropdown, DropdownButton, Modal, Row} from "react-bootstrap";
import axios from "axios";
import {Link, withRouter} from "react-router-dom";
import "./Staff.css"
import moment from "moment";
import Datetime from "react-datetime";
import Details from "./seat/Details";

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
            isMember:false,
            isInvalidEmail:false,
            discountPassdown:1,
            userMembership:0,
            displayFood:false,
            displayMovie:false,
            showSelectDate:false,
            // isDateSelected:false,
            showSelectSeat:false,
            selectedDate: moment().format("YYYY-MM-DD"),
            currentMovie:{},
            user: {
                email: ''
            }

        };
        this.handleSelectDate = this.handleSelectDate.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleDateClose = this.handleDateClose.bind(this);
        this.handleConfirmDate = this.handleConfirmDate.bind(this);
        this.handleSeatClose = this.handleSeatClose.bind(this);
    }

    handleSelectTime(){
        this.setState({
            show:false,
            showSelectSeat:true
        })
    }

    handleSeatClose(){
        this.setState({
            showSelectSeat:false
        })
    }

    handleConfirmDate(){
        this.setState({
            showSelectDate: false,
            show: true,
        })
    }

    handleDateClose(){
        this.setState({
            showSelectDate:false
        })
    }



    pay(){
        this.props.history.push({ pathname: "/Pay", state: { total:this.state.subtotal,lists:this.state.carts} })
    }

    componentDidMount() {
        axios.get("/api/foodList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({foodList: res.data.data.content});
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
                    this.setState({list: res.data.data.content});
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

    addToCart() {
        let storage = window.localStorage;
        let cart = storage.getItem("cart");
        let value = this.state.currentMovie;
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
        alert("add success！")
        this.setState({
            showSelectSeat:false
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
        console.log(666666,value);
        this.setState({
            currentMovie: value,
        });

        axios.get("/api/movieSchedule?id="+value.id).then(res=>{
            console.log(3333,res.data);
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
                showSelectDate:true
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
                if(res.status === 200 && res.data.membership !== undefined){
                    this.setState({
                        userMembership: res.data.membership,
                        isInvalidEmail:false
                    })
                }else{
                    this.setState({
                        isInvalidEmail:true,
                        userMembership: 0
                    })
                    return
                }
            }).then(res=>{
                let discount = 1;
                console.log(this.state.userMembership);
                if(this.state.userMembership >= 100 && this.state.userMembership < 200){

                    discount = 0.9;
                    this.setState({
                        discountPassdown:0.9
                    })
                } else if( this.state.userMembership >= 200) {

                    discount = 0.8;
                    this.setState({
                        discountPassdown:0.8
                    })
                }else{
                    discount = 1;
                    this.setState({
                        discountPassdown:1
                    })
                }
                let total = 0;
                for(let value of JSON.parse(window.localStorage.getItem("cart"))){
                    total += value.price;
                }
                console.log(discount);
                this.setState({
                    total: (total * 0.0625 + total * discount).toFixed(2),
                    subtotal: (total * 0.0625 + total).toFixed(2)
                })
            })
        }else{
            alert("please input user email!")
            this.setState({
                isInvalidEmail:true
            })
        }

    }

    handleGetFood() {
        this.setState({
            displayFood:true,
            displayMovie:false,
        })
    }

    handleGetMovie() {
        this.setState({
            displayMovie:true,
            displayFood:false,
        })
    }

    handleDateChange(value){
        console.log(moment(value).format("YYYY-MM-DD"));
        this.setState({
            selectedDate: moment(value).format("YYYY-MM-DD"),
        })
    }

    render() {
        return (
            <React.Fragment>

                <Container>
                    <div className="staffBG">
                    {
                        this.state.displayFood || this.state.displayMovie ?
                            ""
                            :
                            <div>
                                <p>Your Login session is: </p>
                                <p>{new Date().getHours()} : {new Date().getMinutes()} : {new Date().getSeconds()} {new Date().toDateString()} </p>

                            </div>
                    }
                    <button className="btn-primary" onClick={this.handleGetFood.bind(this)}>Get Food</button>
                        &nbsp;&nbsp;&nbsp;
                    <button className="btn-primary" onClick={this.handleGetMovie.bind(this)}>Get Movie</button>
                        &nbsp;&nbsp;&nbsp;
                    <Link to="/Signup">
                        <button className="btn-primary">Register  Customer</button>
                    </Link>

                    {
                        this.state.displayFood ?
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
                            :
                            ""
                    }
                    {
                        this.state.displayMovie ?
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
                                                <th>${value.price}</th>
                                                <th>{value.description}</th>
                                                <th> <img src={value.image} height={100} width={100}/></th>
                                                <th> <button onClick={this.handleShowModal.bind(this,value)}>Add</button></th>
                                                <Modal show={this.state.showSelectDate} onHide={this.handleDateClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Select the date</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Datetime dateFormat="YYYY-MM-DD" defaultValue={moment().format("YYYY-MM-DD")} minYear={new Date().getUTCFullYear()} minMonth={new Date().getUTCMonth() + 1} minDate={new Date().getDate()} timeFormat={false} onChange={(e)=>this.handleDateChange(e)}>
                                                        </Datetime>

                                                        <Modal.Title>date Selected: {this.state.selectedDate}</Modal.Title>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={this.handleDateClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button variant="primary" onClick={this.handleConfirmDate}>
                                                            next
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <Modal show={this.state.show} onHide={this.handleClose.bind(this)}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Select the time</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <DropdownButton id="dropdown-item-button" title="Available Time">
                                                            {
                                                                this.state.scheduleInfo.map((value,index)=>{
                                                                    return (
                                                                        <Dropdown.Item as="button" key={index}
                                                                                       eventKey={value.startTime+"@"+value.movie.name+"@"+value.room.capacity}
                                                                                       onSelect={(key)=>{this.handleSelectDate(key)}}>
                                                                            {value.startTime}
                                                                        </Dropdown.Item>
                                                                    )
                                                                })
                                                            }
                                                            <Dropdown.Item as="button" eventKey="16:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>3:00PM</Dropdown.Item>
                                                            <Dropdown.Item as="button" eventKey="17:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>5:00PM</Dropdown.Item>
                                                            <Dropdown.Item as="button" eventKey="18:00PM" onSelect={(key)=>{this.handleSelectDate(key)}}>6:00PM</Dropdown.Item>
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
                                                        <Button variant="primary" onClick={this.handleSelectTime.bind(this)}>
                                                            Next
                                                        </Button>
                                                    </Modal.Footer>
                                                </Modal>
                                                <Modal show={this.state.showSelectSeat} onHide={this.handleSeatClose}>
                                                    <Modal.Header closeButton>
                                                        <Modal.Title>Select the Seat</Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        <Details></Details>
                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={this.handleSeatClose}>
                                                            Cancel
                                                        </Button>
                                                        <Button variant="primary" onClick={this.addToCart.bind(this)}>
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
                            :
                            ""
                    }
                    {
                        this.state.displayMovie || this.state.displayFood ?
                            <div>
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
                                {
                                    this.state.isInvalidEmail ?
                                        <p>No matched user found</p> :
                                        ""
                                }
                                <div align="right">
                                    <Row className="form-check">
                                        <p>Subtotal: {this.state.subtotal} USD</p>
                                        <p>Tax: 6.25%</p>
                                        {
                                            this.state.discountPassdown === 1 ?
                                                ""
                                                :
                                                <p>Membership Discount Applied: {((1 - this.state.discountPassdown) * this.state.subtotal).toFixed(2)}</p>
                                        }
                                        <p>Total: {(this.state.total)} USD</p>
                                        <Link to="/ShoppingCart">
                                            <Button>VIEW CART</Button>
                                        </Link>
                                        <br/>
                                        <p></p>
                                            <Button onClick={this.pay.bind(this)}>CHECKOUT</Button>


                                    </Row>
                                </div>
                            </div>
                            :
                            ""
                    }
                    </div>
                </Container>
            </React.Fragment>
        );
    }
}
export default withRouter(Staff);
