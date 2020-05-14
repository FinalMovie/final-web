import React from "react";
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import "./Signup.css";

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                confirmedPassword:'',
                email:''
            },
            flag: false, // indicate whether clicked on login button
            status: false, // check if the username and password valid or not
            isClicked: false, // check the first time when login button is being clicked
            duplicateUsernameFailed: false,// the username is already in database/failed
            passwordNotMatchFailed: false// confirm password doesn't match password
        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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



    handleChangeEmail(event) {
        let email = event.target.value;
        this.setState({
            user: {
                ...this.state.user,
                email: email
            }
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let formData = new FormData();
        let header = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append("username", this.state.user.username);
        formData.append("password", this.state.user.password);
        formData.append("email", this.state.user.email);

        axios.post("/api/register",formData,header).then(res=>{
            if(res.data.success){
                // alert("Register Succeed！");
                let storage = window.localStorage;
                storage.setItem("islogin",true);
                this.props.history.push("/Home");
            }else{
                this.setState({
                    duplicateUsernameFailed: true,
                })
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="splitSignup leftSignup">
                    <div className="centeredSignup">
                    <h2>Signup</h2>

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
                        {
                            this.state.duplicateUsernameFailed ?
                                <p style={{"color":"red"}}>Username is already in use, please try again</p>
                                :
                                ""
                        }
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

                        <div className="form-group">
                            <label>
                                Email
                                <input type="email"
                                       className="form-control"
                                       name="email"
                                       value={this.state.user.email}
                                       onChange={this.handleChangeEmail}
                                />
                            </label>
                        </div>
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </form>
                </div>
                    </div>
                <div className="splitSignup rightSignup">
                    <div className="centeredSignup">
                        <p>on the right</p>

                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default withRouter(Signup);
