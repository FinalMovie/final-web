import React from 'react';
import './App.css';
import Home from "./home";
import {Route, Switch} from "react-router";
import {BrowserRouter} from "react-router-dom";
import Login from "./Login";
import Header from "./Header";


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
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </BrowserRouter>
            </React.Fragment>
        );
    }
}
