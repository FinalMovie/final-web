

import React from "react";

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            },
            flag: false // indicate whether clicked on login button
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleLogout = this.handleLogout.bind(this);
    }

    handleInputChange(event) {
        const {name, value} = event.target;
        // this.state.user[name] = value;
        this.setState({
            user: {
                ...this.state.user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState(
            {flag:true}
        );
        // this.props.login(this.state.user);// this line will finish immediately
    }

    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>
                                Username
                                <input type="text"
                                       className="form-control"
                                       name="username"
                                       value={this.state.user.username}
                                       onChange={this.handleInputChange}
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
                                       onChange={this.handleInputChange}
                                />
                            </label>
                        </div>
                        {
                            // this.props.authUser
                            //     ? <button className="btn btn-danger" type="button" onClick={this.handleLogout}>Logout</button>
                            //     :
                                <button className="btn btn-primary" type="submit">Login</button>
                        }

                    </form>
                </div>

            </React.Fragment>
        );
    }
}
