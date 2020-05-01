import React from "react";
import axios from 'axios';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                email:''
            },
            flag: false, // indicate whether clicked on login button
            status: false, // check if the username and password valid or not
            isClicked: false // check the first time when login button is being clicked

        };
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
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

    render() {
        return (
            <React.Fragment>
                <div className="container">
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

            </React.Fragment>
        );
    }
}
