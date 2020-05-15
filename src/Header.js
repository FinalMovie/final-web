import * as React from "react";
import {Link} from "react-router-dom";


class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loginStatus: window.localStorage.getItem("islogin") === "true",
            isAdmin: window.localStorage.getItem("isadmin") === "true",
            isStaff: window.localStorage.getItem("isstaff") === "true",
        }
    }

    handleLogout() {
        let storage = window.localStorage;
        storage.setItem("islogin", false);
        storage.setItem("isadmin", false);
        storage.setItem("isstaff", false);
        storage.setItem("cart", JSON.stringify([]));
        this.setState({
            loginStatus: false,
            isAdmin: false,
            isStaff: false
        })
    }

    componentWillReceiveProps() {
        console.log(window.localStorage.getItem("isadmin"), window.localStorage.getItem("islogin"), 1213);
        this.setState({
            loginStatus: this.props.loginStatus,
            isAdmin: window.localStorage.getItem("isadmin") === "true",
            isStaff: window.localStorage.getItem("isstaff") === "true"
        })
    }


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-collapse">
                <svg className="bi bi-camera-video-fill" width="2em" height="2em" viewBox="0 0 16 16"
                     fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M2.667 3h6.666C10.253 3 11 3.746 11 4.667v6.666c0 .92-.746 1.667-1.667 1.667H2.667C1.747 13 1 12.254 1 11.333V4.667C1 3.747 1.746 3 2.667 3z"/>
                    <path
                        d="M7.404 8.697l6.363 3.692c.54.313 1.233-.066 1.233-.697V4.308c0-.63-.693-1.01-1.233-.696L7.404 7.304a.802.802 0 000 1.393z"/>
                </svg>

                <a className="navbar-brand">TheLegend27</a>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav">
                        <li className="nav-item active">
                            <Link to="/Home" className="nav-link">Home</Link>
                        </li>
                        {
                            this.state.isAdmin || this.state.isStaff ?
                                ""
                                :
                                <li className="nav-item">
                                    <Link to="/Movie" className="nav-link">Movies</Link>
                                </li>
                        }
                        {
                            this.state.isAdmin || this.state.isStaff ?
                                ""
                                :
                                <li className="nav-item">
                                    <Link to="/Food" className="nav-link">Food</Link>
                                </li>
                        }
                        {
                            this.state.isAdmin || this.state.isStaff ?
                                ""
                                :
                                <li className="nav-item">
                                    <Link to="/WhatNew" className="nav-link">What's New</Link>
                                </li>
                        }


                        {
                            this.state.isAdmin ?
                                <li className="nav-item">
                                    <Link to="/AddMovie" className="nav-link">Manage Movie</Link>
                                </li>
                                :
                                ""
                        }
                        {
                            this.state.isAdmin ?
                                <li className="nav-item">
                                    <Link to="/AddFood" className="nav-link">Manage Food</Link>
                                </li>
                                :
                                ""
                        }
                        {
                            this.state.isStaff ? (
                                    <li className="nav-item">
                                        <Link to="/Staff" className="nav-link">Staff</Link>
                                    </li>
                                )
                                :
                                ""
                        }
                        {
                            this.state.isStaff ? (
                                    <li className="nav-item">
                                        <Link to="/WhatNew" className="nav-link">Upcoming Movies</Link>
                                    </li>
                                )
                                :
                                ""
                        }
                    </ul>
                    <ul className="nav navbar-nav ml-auto">
                        <li className="nav-item">
                            {
                                this.state.loginStatus ?
                                    <Link to="/Home" onClick={this.handleLogout.bind(this)}>Logout</Link>
                                    :
                                    <Link to="/Login">Login</Link>
                            }
                            {
                                this.state.loginStatus ?
                                    <svg className="bi bi-person-dash-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm5-.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    :
                                    <svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"/>
                                    </svg>
                            }

                        </li>
                        <li className="nav-item">
                            {
                                this.state.loginStatus ? (
                                        this.state.isAdmin || this.state.isStaff ? "" : <Link to="/ShoppingCart">My Cart</Link>
                                    )
                                    : <Link to="/Signup">Signup</Link>
                            }
                            {
                                this.state.loginStatus ? (
                                        this.state.isAdmin || this.state.isStaff ? "" :
                                            <svg className="bi bi-bag-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                                 fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M1 4h14v10a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm7-2.5A2.5 2.5 0 005.5 4h-1a3.5 3.5 0 117 0h-1A2.5 2.5 0 008 1.5z"/>
                                            </svg>
                                    )
                                    :
                                    <svg className="bi bi-person-plus-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm7.5-3a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 010-1H13V5.5a.5.5 0 01.5-.5z"
                                              clipRule="evenodd"/>
                                        <path fillRule="evenodd"
                                              d="M13 7.5a.5.5 0 01.5-.5h2a.5.5 0 010 1H14v1.5a.5.5 0 01-1 0v-2z"
                                              clipRule="evenodd"/>
                                    </svg>
                            }
                        </li>
                        <li className="nav-item">
                            {
                                this.state.loginStatus ?
                                    <Link to="/Profile" onClick={this.handleLogout.bind(this)}>Profile</Link>
                                    :
                                    <div/>
                            }
                            {
                                this.state.loginStatus ?
                                    <svg className="bi bi-person-dash-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 100-6 3 3 0 000 6zm5-.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z"
                                              clipRule="evenodd"/>
                                    </svg>
                                    :
                                    <svg className="bi bi-person-fill" width="1em" height="1em" viewBox="0 0 16 16"
                                         fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z"
                                              clipRule="evenodd"/>
                                    </svg>
                            }

                        </li>
                    </ul>
                </div>
            </nav>

        );
    }
}

export default Header;
