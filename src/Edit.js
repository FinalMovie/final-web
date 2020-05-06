import React from "react";
import axios from 'axios';
import "./Movie.css";
import {unstable_batchedUpdates} from "react-dom";


export default class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listMovie: [],
            listFood: []
        };
    }

    componentDidMount() {
        axios.get("/api/movieList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({listMovie: res.data.data});
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
        axios.get("/api/foodList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({listFood: res.data.data});
                console.log(res.data.data);
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
    }
    addToCart(event) {
        event.preventDefault();
        // this.props.functionCallFromParent();
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-md">
                        <table className="table table-dark">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope ="col">Description</th>
                                <th scope ="col">Image</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.listMovie.map((value,index) => {
                                    return (
                                    <tr>
                                        <th>{value.id}</th>
                                        <th>{value.name}</th>
                                        <th>{value.price}</th>
                                        <th>{value.description}</th>
                                        <th>{<img src={value.image} height={100} width={100}/>}</th>
                                    </tr>
                                    );
                                })
                            }
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Calories</th>
                                <th scope="col">Image</th>
                            </tr>
                            {
                                this.state.listFood.map((value,index) => {
                                    return (
                                        <tr>
                                            <th>{value.id}</th>
                                            <th>{value.name}</th>
                                            <th>{value.price}</th>
                                            <th>{value.calories}</th>
                                            <th>{<img src={value.image} height={100} width={100}/>}</th>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                </div>

                    })
            </React.Fragment>
        );
    }

}
