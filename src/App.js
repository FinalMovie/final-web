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



export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state={
            isAdmin: false,
            loginStatus:false
        }
    }

    getLoginStatus=(value)=>{
        console.log("child:",value);
        let storage = window.localStorage;
        storage.setItem("islogin",value);
        if(value){
            this.setState({
                loginStatus:value
            })
        }
    }

    isAdminUser=(value)=>{
        let storage = window.localStorage;
        storage.setItem("isadmin",value);
        console.log(value,11212121)
        this.setState({
            isAdmin:value
        })
    }


    render () {
        const login = props=>{
            return <Login getLoginStatus={this.getLoginStatus} isAdminUser={this.isAdminUser}/>
        }
        // const admin = props=>{
        //     return <Header isAdminUser={this.isAdminUser}>
        // }

        // virtual root element will not be rendered to DOM tree. 
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Header loginStatus={this.state.loginStatus || window.localStorage.getItem("islogin")?true:false} isAdmin={this.state.isAdmin || window.localStorage.getItem("isadmin")==="true"?true:false} >
                    </Header>
                    <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/Edit" component={Edit}/>
                        <Route exact path="/Login" component={login}/>
                        <Route exact path="/Movie" component={Movie}/>
                        <Route exact path="/Food" component={Food}/>
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
