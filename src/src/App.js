import React from 'react';
import './App.css';
import Home from "./components/home";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Food from "./components/Food";
import Signup from "./components/Signup";


export default class App extends React.Component {


    render () {
        // virtual root element will not be rendered to DOM tree.
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Header/>
                    <Switch>
                        <Route exact path="/Home" component={Home}/>
                        <Route exact path="/Login" component={Login}/>
                        <Route exact path="/Signup" component={Signup}/>
                        <Route exact path="/Movie" component={Movie}/>
                        <Route exact path="Food" component={Food}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
