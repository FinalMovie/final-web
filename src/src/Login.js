

import React from "react";
import axios from 'axios';

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
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        event.preventDefault();
        this.setState({
            flag:false
        })
    }


    handleChangeUsername(event) {
        let username = event.target.value;
        this.setState({
            user: {
                ...this.state.user,
                username:username
            }
        })
    }

    handleChangePassword(event){
        let password = event.target.value;
        this.setState({
            user: {
                ...this.state.user,
                password:password
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        // this.setState(
        //     {flag:true}
        // );

        let formData=new FormData();
        let header = {     
          headers: { 'content-type': 'multipart/form-data' }
        };


        formData.append("username",this.state.user.username);
        formData.append("password",this.state.user.password);

        // 请求后端接口 进行登陆 form表单登陆
        axios.post("/api/login",formData,header).then(res=>{
            console.log(this.state.user.password);
            if(res.data.success){
                this.setState(
                    {flag:true}
                );
                alert("Welcome "+this.state.user.username)

            }else{
                alert("FAILED to LOGIN！")
            }
        })
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
                            this.state.flag
                                ?<button className="btn btn-danger" type="button" onClick={this.handleLogout}>Logout</button>
                                :
                                <button className="btn btn-primary" type="submit">Login</button>
                        }
                    </form>
                </div>

            </React.Fragment>
        );
    }
}