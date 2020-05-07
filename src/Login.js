import React from "react";
import axios from 'axios';
import {Link,withRouter} from "react-router-dom";

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
            if (res.data.success) {
                this.setState(
                    {flag: true}
                );
                this.props.getLoginStatus(true);
                alert("Welcome " + this.state.user.username)
                storage.setItem("username",this.state.user.username);
                this.props.history.push('/Home');
            } else {
                this.props.getLoginStatus(false);
                this.setState({
                    loginFailed:true
                })
            }
        }).then(res=>{
            axios.get("/api/currentUser").then(res=>{
                if(res.status === 200){
                    console.log(res.data.role===0,1111)
                    if(res.data.role === 0){
                        this.props.isAdminUser(true)
                    }else{
                        this.props.isAdminUser(false)
                    }
                }
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-md">
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
                            this.state.loginFailed?
                            <div>
                                <p style={{"color":"red"}}>username or password is incorrect！</p>
                            </div>
                            :
                            ""
                        }
                        {
                            this.state.flag
                                ? <button className="btn btn-danger" type="button" onClick={this.handleLogout}>Logout</button>
                                :
                                <button className="btn btn-primary" type="submit">Login</button>
                        }

                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(Login);
