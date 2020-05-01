import * as React from "react";
import axios from "axios";
import {Table} from 'react-bootstrap';


export default class Food extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        // TODO 1. 装载state后显示；2. 设置全局登录拦截器，如果未登录会返回{success:false,msg:need login}
        axios.get("/api/foodList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({list: res.data.data});
                console.log(res.data.data);
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
    }

    render() {
        return (
            <React.Fragment>

                    {
                        this.state.list.map((value,index) =>{
                            return (
                                <div className="card">
                                    <img src={value.image} height={300} width={300}/>
                                    <h1>{value.name}</h1>
                                    <p className="price">${value.price}</p>
                                    <p className="price">{value.calories} Calories</p>
                                    <p>
                                        <button>Add to Cart</button>
                                    </p>
                                </div>
                            )
                        })
                    }

            </React.Fragment>
        );
    }
}
