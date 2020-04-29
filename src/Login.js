

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
        // this.handleLogout = this.handleLogout.bind(this);
    }

    // 做了修改，username和password分别绑定不同的点击事件
    handleChangeUsername(event) {
        let username = event.target.value;
        // const {name, value} = event.target;
        // this.state.user[name] = value;
        // this.setState({
        //     user: {
        //         ...this.state.user,
        //         [name]: value
        //     }
        // });
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
        this.setState(
            {flag:true}
        );

        let formData=new FormData();
        // 请求头
        let header = {     
          headers: { 'content-type': 'multipart/form-data' }
        };

        // form表单必须使用formdata提交请求
        formData.append("username",this.state.user.username);
        formData.append("password",this.state.user.password);

        // 请求后端接口 进行登陆 form表单登陆
        axios.post("/api/login",formData,header).then(res=>{
            if(res.data.success){
                alert("登陆成功！")
            }else{
                alert("登陆失败！")
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
