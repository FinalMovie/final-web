import React from 'react';
import './App.css';
import Home from "./home";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Login from "./Login";
import Header from "./Header";
import Movie from "./Movie";
import Food from "./Food";
import Signup from "./Signup";
import Pay from "./PayPage";
import ShoppingCart from "./ShoppingCart";
import 'bootstrap/dist/css/bootstrap.css';
import Edit from "./Edit";
import Staff from "./Staff";
import WhatNew from "./WhatNew";
import AddMovie from "./AddMovie";
import AddFood from "./AddFood";


export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAdmin: false,
            loginStatus: false,
            isStaff: false
        }
    }

    getLoginStatus = (value) => {
        console.log("child:", value);
        if (value) {
            this.setState({
                loginStatus: value
            })
        }
    }

    isAdminUser = (value) => {
        if (value) {
            this.setState({
                isAdmin: value
            })
        }
    }

    isStaffUser = (value) => {
        if (value) {
            this.setState({
                isStaff: value
            })
        }
    }


    render() {
        const login = props => {
            return <Login getLoginStatus={this.getLoginStatus} isAdminUser={this.isAdminUser} isStaffUser={this.isStaffUser}/>
        }
        // const admin = props=>{
        //     return <Header isAdminUser={this.isAdminUser}>
        // }

        // virtual root element will not be rendered to DOM tree. 
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Header
                        loginStatus={this.state.loginStatus || window.localStorage.getItem("islogin") === "true" ? true : false}
                        isAdmin={this.state.isAdmin || window.localStorage.getItem("isadmin") === "true" ? true : false}
                        isStaff={this.state.isStaff || window.localStorage.getItem("isstaff") === "true" ? true : false}>
                    </Header>
                    <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/Edit" component={Edit}/>
                        <Route exact path="/Login" component={login}/>
                        <Route exact path="/Movie" component={Movie}/>
                        <Route exact path="/Food" component={Food}/>
                        <Route exact path="/AddMovie" component={AddMovie}/>
                        <Route exact path="/AddFood" component={AddFood}/>
                        <Route exact path="/WhatNew" component={WhatNew}/>
                        <Route exact path="/ShoppingCart" component={ShoppingCart}/>
                        <Route exact path="/Pay" component={Pay}/>
                        <Route exact path="/Signup" component={Signup}/>
                        <Route exact path="/Staff" component={Staff}/>
                        <Route exact path="/" component={Home}/>

                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
