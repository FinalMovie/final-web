import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import "./login.css"

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            },
            loginFailed: false,
            flag: false // indicate whether clicked on login button

        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        axios.get("/api/logout").then(res => {
            if (res.data.success) {
                alert("SUCCESS TO LOGOUT! ");
            } else {
                alert("FAILED to LOGIN！");
            }
        })
    }


    handleChangeUsername(event) {
        let username = event.target.value;
        this.setState({
            user: {
                ...this.state.user,
                username: username
            }
        })
    }

    handleChangePassword(event) {
        let password = event.target.value;
        this.setState({
            user: {
                ...this.state.user,
                password: password
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        let storage = window.localStorage;
        let formData = new FormData();
        let header = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append("username", this.state.user.username);
        formData.append("password", this.state.user.password);

        axios.post("/api/login", formData, header).then(res => {
            console.log(res);
            console.log(res.data + "this is data object")
            if (res.data.success) {
                this.setState(
                    {flag: true}
                );
                this.props.getLoginStatus(true);
                storage.setItem("islogin", true);
                // alert("Welcome " + this.state.user.username)

                storage.setItem("username", this.state.user.username);
                this.props.history.push('/Home');
            } else {
                this.props.getLoginStatus(false);
                this.setState({
                    loginFailed: true
                })
            }
        }).then(res => {
            axios.get("/api/currentUser").then(res => {
                if (res.status === 200) {
                    storage.setItem("current", res.data);
                    storage.setItem("membership", res.data.membership);
                    storage.setItem("email", res.data.email);
                    if (res.data.role === "admin") {
                        storage.setItem("isadmin", true);
                        this.props.isAdminUser(true)
                        console.log("ADMINNNNNNNN")
                    } else if (res.data.role === "staff") {
                        storage.setItem("isstaff", true);
                        this.props.isStaffUser(true)
                    } else {
                        this.props.isAdminUser(false)
                        console.log("REGULARRRRRR")
                    }

                }
            })
        })
    }


    render() {
        return (
            <React.Fragment>

                <div className="split left">
                    <div className="centered">
                        <h2>Login</h2>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>
                                    Username
                                    <input type="text"
                                           className="form-control"
                                           name="username"
                                           value={this.state.user.username}
                                           onChange={this.handleChangeUsername}
                                    />
                                </label>
                            </div>
                            <div className="form-group">
                                <label>
                                    Password
                                    <input type="password"
                                           className="form-control"
                                           name="password"
                                           value={this.state.user.password}
                                           onChange={this.handleChangePassword}
                                    />
                                </label>
                            </div>
                            {
                                this.state.loginFailed ?
                                    <div>
                                        <p style={{"color": "red"}}>username or password is incorrect！</p>
                                    </div>
                                    :
                                    ""
                            }
                            {
                                this.state.flag
                                    ?
                                    <button className="btn btn-danger" type="button" onClick={this.handleLogout}>Logout</button>
                                    :
                                    <button className="btn btn-primary" type="submit">Login</button>
                            }

                        </form>
                    </div>
                </div>
                <div className="split right">
                    <div className="centered">

                    </div>
                </div>


            </React.Fragment>
        );
    }
}

export default withRouter(Login);
