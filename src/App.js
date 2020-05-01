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
import 'bootstrap/dist/css/bootstrap.css';


export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state={
            loginStatus: false
        }
    }

    getLoginStatus=(value)=>{
        console.log("child:",value);
        this.setState({
            loginStatus:value
        })
    }

    render () {
        // 传递登陆状态获取方法 给login组件
        // login 成功之后 返回值回来， 同时把状态传递给header组件，header组件根据状态决定显示那个
        const login = props=>{
            return <Login getLoginStatus={this.getLoginStatus}/>
        }
        // virtual root element will not be rendered to DOM tree. 
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Header loginStatus={this.state.loginStatus} />
                    <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/Login" component={login}/>
                        <Route exact path="/Movie" component={Movie}/>
                        <Route exact path="/Food" component={Food}/>
                        <Route exact path="/Login" component={login}/>
                        <Route exact path="/Signup" component={Signup}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
