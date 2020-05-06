import * as React from "react";
import axios from "axios";
import "./Movie.css";


export default class Movie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        axios.get("/api/movieList").then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({list: res.data.data});
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
                {
                    this.state.list.map((value,index) => {
                        return (
                                <div className="card">
                                    <img src={value.image} height={300} width={300}/>
                                    <h1>{value.name}</h1>
                                    <p className="price">${value.price}</p>
                                    <p>{value.description}</p>
                                    <p>
                                        <button onClick={this.addToCart.bind(this)}>Add to Cart</button>
                                    </p>
                                </div>
                        )
                    })
                }
            </React.Fragment>
        );
    }
}
