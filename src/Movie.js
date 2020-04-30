import * as React from "react";
import axios from "axios";


export default class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        // TODO 1. 装载state后显示；2. 设置全局登录拦截器，如果未登录会返回{success:false,msg:need login}
        axios.get("/api/movieList").then(res => {
            if (res.data.success) {
                this.setState({list: res.data.data});
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <h2>THIS PAGE SHOULD DISPLAY MOVIES</h2>

            </React.Fragment>
        );
    }
}
