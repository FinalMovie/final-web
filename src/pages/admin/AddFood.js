import React from "react";
import axios from 'axios';
import "../movie/Movie.css";
import {Modal} from 'react-bootstrap';
import Pagination from 'rc-pagination';
import {notification} from "antd";


export default class AddFood extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listFood: [],
            currentPage: 0,
            pageSize: 10,
            total: 10,
            foodEditShow: false,
            current: {},
            foodAddFlag: false
        };
        this.handleChange = this.handleChange.bind(this);

        this.handleFoodEditClose = this.handleFoodEditClose.bind(this);

        this.handleFoodEditSubmit = this.handleFoodEditSubmit.bind(this);

        this.handleshowFoodAdd = this.handleshowFoodAdd.bind(this);
    }

    componentDidMount() {
        axios.get("/api/foodList?size=" + this.state.pageSize + "&page=" + this.state.currentPage).then(res => {
            console.log(res.data)
            if (res.data.success) {
                this.setState({
                    listFood: res.data.data.content,
                    total: res.data.data.totalPages * this.state.pageSize
                });
                console.log(res.data.data);
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
    }

    handleFoodEditClose() {
        this.setState({
            foodEditShow: false
        })
    }


    handleshowFoodEdit(value) {
        console.log(value);
        this.setState({
            foodEditShow: true,
            current: value
        })
    }


    handleFoodEditSubmit() {
        if (this.state.foodAddflag) {
            let formData = new FormData();
            console.log(this.state.current.name, this.state.current.price, this.state.current.calories, this.state.current.image)
            formData.append("name", this.state.current.name);
            formData.append("price", parseInt(this.state.current.price));
            formData.append("calories", this.state.current.calories);
            formData.append("image", this.state.current.image);
            let header = {
                headers: {'content-type': 'multipart/form-data'}
            };
            axios.post("/api/addFood", formData, header).then(res => {
                if (res.data.success) {
                    notification['success']({
                        message: 'New Food Added!',
                    });
                    window.location.reload(true);
                } else {

                    notification['error']({
                        message: res.data.msg,
                    });
                }
            }).then(res => {
                this.setState({
                    foodAddFlag: false,
                    foodEditShow: false,
                    current: {}
                })
            })
        } else {
            let formData = new FormData();
            formData.append("name", this.state.current.name);
            formData.append("price", this.state.current.price);
            formData.append("id", this.state.current.id);
            formData.append("calories", this.state.current.calories);
            formData.append("image", this.state.current.image);
            let header = {
                headers: {'content-type': 'multipart/form-data'}
            };
            axios.post("/api/editFood", formData, header).then(res => {
                if (res.data.success) {
                    notification['success']({
                        message: 'Change Saved',
                    });
                    window.location.reload(true);
                } else {
                    notification['error']({
                        message: res.data.msg,
                    });
                }
            })
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            current: {
                ...this.state.current,
                [event.target.name]: event.target.value
            }
        })
    }

    DeleteFood(value) {
        let formData = new FormData();
        let header = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append("id", parseInt(value.id));

        axios.post("/api/deleteFood", formData, header).then(res => {
            if (res.data.success) {
                notification['success']({
                    message: "Food is Deleted",
                });
                window.location.reload(true);
            } else {
                notification['error']({
                    message: 'Failed to Delete!',
                });
            }
        })
    }


    handleshowFoodAdd() {
        this.setState({
            foodEditShow: true,
            foodAddflag: true,
        })
    }


    onPageNumChange(value) {
        console.log(value);
        this.setState({
            currentPage: value - 1,
        })
        let page = value - 1;
        axios.get("/api/foodList?size=" + this.state.pageSize + "&page=" + page).then(res => {
            console.log(123, res.data, res.data.data.totalPages)
            if (res.data.success) {
                this.setState({
                    listFood: res.data.data.content,
                    total: res.data.data.totalPages * this.state.pageSize
                });
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-md">
                    <button onClick={this.handleshowFoodAdd}>Add Food</button>
                    <table className="table table-dark table-striped">
                        <tbody>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Calories</th>
                            <th scope="col">Image</th>
                        </tr>
                        {
                            this.state.listFood.map((value, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{value.id}</th>
                                        <th>{value.name}</th>
                                        <th>${value.price}</th>
                                        <th>{value.calories}</th>
                                        <th>{<img src={value.image} height={100} width={100}/>}</th>
                                        <th>
                                            <button style={{color: "black"}} onClick={this.handleshowFoodEdit.bind(this, value)}>Modify</button>
                                            <br/>
                                            -
                                            <br/>
                                            <button style={{color: "black"}} onClick={this.DeleteFood.bind(this, value)}>Delete</button></th>
                                    </tr>
                                );
                            })
                        }

                        <Modal show={this.state.foodEditShow} onHide={this.handleFoodEditClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit Food Info</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    ID
                                    <div className="form-group">
                                        <label>
                                            {this.state.current.id}
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Name
                                            <input type="text"
                                                   className="form-control"
                                                   name="name"
                                                   value={this.state.current.name}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Price
                                            <input type="text"
                                                   className="form-control"
                                                   name="price"
                                                   value={this.state.current.price}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Calories
                                            <input type="text"
                                                   className="form-control"
                                                   name="calories"
                                                   value={this.state.current.calories}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <label>
                                            Image
                                            <input type="text"
                                                   className="form-control"
                                                   name="image"
                                                   value={this.state.current.image}
                                                   onChange={this.handleChange}
                                            />
                                        </label>
                                    </div>
                                </form>
                                <button className="btn btn-primary" onClick={this.handleFoodEditSubmit}>Submit</button>
                            </Modal.Body>
                        </Modal>
                        </tbody>
                        <tfoot>
                        <Pagination current={this.state.currentPage + 1}
                                    total={this.state.total}
                                    onChange={(pageNum) => {
                                        this.onPageNumChange(pageNum)
                                    }}/>
                        </tfoot>
                    </table>
                </div>
                })
            </React.Fragment>
        );
    }

}
