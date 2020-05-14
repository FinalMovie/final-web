import * as React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import {Button, Col, Container, Dropdown, DropdownButton, Modal, Row} from 'react-bootstrap';
import Details from "../../seat/Details";
import Datetime from 'react-datetime';
import moment from 'moment';
import "./Movie.css";
import "../login/Login";

class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            show: false,
            isDateSelected: false,//check if the date is being selected
            selectedTime: "",
            scheduleInfo: [],
            currentMovie: {},
            showSelectDate: false,
            // isDateSelected:false,
            showSelectSeat: false,
            selectedDate: moment().format("YYYY-MM-DD")
        };
        this.handleSelectDate = this.handleSelectDate.bind(this);
        this.handleDateClose = this.handleDateClose.bind(this);
        this.handleConfirmDate = this.handleConfirmDate.bind(this);
        this.handleSeatClose = this.handleSeatClose.bind(this);
    }

    handleSeatClose() {
        this.setState({
            showSelectSeat: false
        })
    }

    handleDateClose() {
        this.setState({
            showSelectDate: false
        })
    }

    handleConfirmDate() {
        document.body.scrollIntoView(true);
        this.setState({
            showSelectDate: false,
            show: true,
        })
    }

    componentDidMount() {
        document.body.scrollIntoView(true);
        let storage = window.localStorage;
        console.log(storage.getItem("islogin"));
        // if(storage.getItem("islogin") !== 'true'){
        //     alert("Please Login First！");
        //     this.props.history.push("/Login");
        // }else{
        axios.get("/api/movieList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({list: res.data.data.content});
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })

    }

    handleSelectTime() {
        this.setState({
            show: false,
            showSelectSeat: true
        })
    }

    addToCart() {
        let storage = window.localStorage;
        let cart = storage.getItem("cart");
        let value = this.state.currentMovie;
        console.log("test", this.state.selectLatestTime, this.state.selectedTime)
        if (cart === null) {
            let cart = [];
            value["type"] = "movie";
            value["roomname"] = this.state.selectRoomName;
            value["lasttime"] = this.state.selectLatestTime
            value["start_time"] = this.state.selectedTime;
            cart.push(value);
            storage.setItem("cart", JSON.stringify(cart));
            console.log(111);
        } else {
            console.log(222);
            value["type"] = "movie";
            value["start_time"] = this.state.selectedTime;
            value["roomname"] = this.state.selectRoomName;
            value["lasttime"] = this.state.selectLatestTime
            let cart = JSON.parse(storage.getItem("cart"));
            cart.push(value);
            storage.setItem("cart", JSON.stringify(cart));
        }
        // alert("add success！")
        this.setState({
            showSelectSeat: false
        })
        storage.setItem("movie_name", value.name)
        // this.props.functionCallFromParent();
    }

    handleClose() {
        this.setState({
            show: false,
            isDateSelected: false
        })
    }

    handleShowModal(value) {
        let storage = window.localStorage;
        let loggedIn = storage.getItem("islogin");
        if (loggedIn === "false") {
            this.props.history.push({pathname: "/Login"});
            return;
        }

        this.setState({
            currentMovie: value,
        });
        axios.get("/api/movieSchedule?id=" + value.id).then(res => {
            console.log(3333, res.data);
            if (res.data.success) {
                this.setState({
                    scheduleInfo: res.data.data,
                })
                console.log(res.data.data);
            } else {
                this.setState({
                    scheduleInfo: []
                })
            }
        }).then(res => {
            this.setState({
                showSelectDate: true
            })
        })
    }

    handleSelectDate(value) {
        console.log(value);
        let movieInfo = value.split("@");
        console.log(movieInfo, "test2");
        if (movieInfo[2] <= 0) {
            alert("Tickets sold out");
            return false
        } else {
            let storage = window.localStorage;
            storage.setItem("start_time", value[0]);
            this.setState({
                isDateSelected: true,
                selectedTime: movieInfo[0],
                selectLatestTime: movieInfo[4],
                selectRoomName: movieInfo[3]
            })
        }
    }

    handleDateChange(value) {
        console.log(moment(value).format("YYYY-MM-DD"));
        this.setState({
            selectedDate: moment(value).format("YYYY-MM-DD"),
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="movieBG">
                    <Container>
                        <Row>
                            {
                                this.state.list.map((value, index) => {
                                    return (
                                        <Col key={index}>
                                            <div className="card">
                                                <img src={value.image} height={300} width={300}/>
                                                <h1>{value.name}</h1>
                                                <p className="price">${value.price}</p>
                                                <p>{value.description}</p>
                                                <p>
                                                    <Button onClick={this.handleShowModal.bind(this, value)}>Add to
                                                        Cart</Button>
                                                </p>
                                            </div>
                                            <Modal show={this.state.showSelectDate} onHide={this.handleDateClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Select the date</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <Datetime dateFormat="YYYY-MM-DD"
                                                              defaultValue={moment().format("YYYY-MM-DD")}
                                                              minYear={new Date().getUTCFullYear()}
                                                              minMonth={new Date().getUTCMonth() + 1}
                                                              minDate={new Date().getDate()} timeFormat={false}
                                                              onChange={(e) => this.handleDateChange(e)}>
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
                                                            this.state.scheduleInfo.map((value, index) => {
                                                                return (
                                                                    <Dropdown.Item as="button" key={index}
                                                                                   eventKey={value.startTime + "@" + value.movie.name + "@" + value.room.capacity + '@' + value.room.name + '@' + value.lastTime}
                                                                                   onSelect={(key) => {
                                                                                       this.handleSelectDate(key)
                                                                                   }}>
                                                                        {value.startTime}
                                                                    </Dropdown.Item>
                                                                )
                                                            })
                                                        }

                                                        <Dropdown.Item as="button" eventKey="16:00PM" onSelect={(key) => {
                                                            this.handleSelectDate(key)
                                                        }}>3:00PM</Dropdown.Item>
                                                        <Dropdown.Item as="button" eventKey="17:00PM" onSelect={(key) => {
                                                            this.handleSelectDate(key)
                                                        }}>5:00PM</Dropdown.Item>
                                                        <Dropdown.Item as="button" eventKey="18:00PM" onSelect={(key) => {
                                                            this.handleSelectDate(key)
                                                        }}>6:00PM</Dropdown.Item>
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
                                        </Col>
                                    )
                                })
                            }

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

                        </Row>
                    </Container>
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(Movie);
