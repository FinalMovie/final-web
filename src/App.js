import React from 'react';
import './App.css';
import Home from "./home";
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import Login from "./pages/login/Login";
import Movie from "./pages/movie/Movie";
import Food from "./pages/food/Food";
import Signup from "./pages/login/Signup";
import Pay from "./pages/pay/PayPage";
import 'bootstrap/dist/css/bootstrap.css';
import ShoppingCart from "./pages/cart/ShoppingCart";
import Edit from "./pages/admin/Edit";
import Staff from "./pages/staff/Staff";
import WhatNew from "./WhatNew";
import AddMovie from "./pages/admin/AddMovie";
import AddFood from "./pages/admin/AddFood";
import Profile from "./pages/profile/Profile";
import {Layout} from "antd";
import Header from "./Header";
import RegisterStaff from "./pages/admin/RegisterStaff";


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
        const login = () => {
            return <Login getLoginStatus={this.getLoginStatus} isAdminUser={this.isAdminUser} isStaffUser={this.isStaffUser}/>
        }
        return (
            // <Layout>
                <BrowserRouter>
                    <Header
                        loginStatus={this.state.loginStatus || window.localStorage.getItem("islogin") === "true"}
                        isAdmin={this.state.isAdmin || window.localStorage.getItem("isadmin") === "true"}
                        isStaff={this.state.isStaff || window.localStorage.getItem("isstaff") === "true"}>
                    </Header>
                    <Switch>
                        <Route exact path="/Home" component={Home}/>
                        {/*<Route exact path="/Edit" component={Edit}/>*/}
                        <Route exact path="/Login" component={login}/>
                        <Route exact path="/Movie" component={Movie}/>
                        <Route exact path="/Food" component={Food}/>
                        <Route exact path="/AddMovie" component={AddMovie}/>
                        <Route exact path="/AddFood" component={AddFood}/>
                        <Route exact path="/RegisterStaff" component={RegisterStaff}/>
                        <Route exact path="/WhatNew" component={WhatNew}/>
                        <Route exact path="/ShoppingCart" component={ShoppingCart}/>
                        <Route exact path="/Pay" component={Pay}/>
                        <Route exact path="/Signup" component={Signup}/>
                        <Route exact path="/Staff" component={Staff}/>
                        <Route exact path="/Profile" component={Profile}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </BrowserRouter>
            // </Layout>
        );
    }
}
