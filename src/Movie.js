import * as React from "react";
import axios from "axios";
import {Table} from 'react-bootstrap';


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
            console.log(res.data)
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
                <Table striped bordered  hover>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>movie_name</th>
                        <th>description</th>
                        <th>price</th>
                        <th>image_url</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.list.map((value,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.description}</td>
                                    <td>{value.price}</td>
                                    <td>{value.image}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}
