import React from "react";
import axios from 'axios';
import "./Movie.css";
import Pagination from './pagination/index.jsx';
import {Modal,Button,Form} from 'react-bootstrap';
import {unstable_batchedUpdates} from "react-dom";


export default class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listMovie: [],
            listFood: [],
            movieEidtShow: false,
            foodEditShow: false,
            current:{},
            movieAddFlag:false,
            foodAddFlag:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMovieEditClose = this.handleMovieEditClose.bind(this);
        this.handleFoodEditClose = this.handleFoodEditClose.bind(this);
        this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);
        this.handleFoodEditSubmit = this.handleFoodEditSubmit.bind(this);
        this.handleshowMovieAdd = this.handleshowMovieAdd.bind(this);
        this.handleshowFoodAdd = this.handleshowFoodAdd.bind(this);
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

    handleMovieEditClose(){
        this.setState({
            movieEidtShow: false
        })
    }

    handleFoodEditClose(){
        this.setState({
            foodEditShow: false
        })
    }

    handleshowMovieEdit(value){
        console.log(value);
        this.setState({
            movieEidtShow: true,
            current:value
        })
    }

    
    handleshowFoodEdit(value){
        console.log(value);
        this.setState({
            foodEditShow: true,
            current:value
        })
    }

    handleMovieEditSubmit(){
        if(this.state.movieAddFlag){
            let formData = new FormData();
            formData.append("name",this.state.current.name);
            formData.append("price",this.state.current.price);
            formData.append("description",this.state.current.description);
            formData.append("image",this.state.current.image);
            let header = {
                headers: {'content-type': 'multipart/form-data'}
            };
            axios.post("/api/addMovie",formData,header).then(res=>{
                if(res.data.success){
                    alert("Add Succeed")
                }else{
                    alert(res.data.msg);
                }
            }).then(res=>{this.setState({
                movieEidtShow: false,
                movieAddFlag: false,
                current:{}
            })})
        }else{
            console.log(this.state.current)
            let formData = new FormData();
            formData.append("name",this.state.current.name);
            formData.append("price",this.state.current.price);
            formData.append("id",this.state.current.id);
            formData.append("description",this.state.current.description);
            formData.append("image",this.state.current.image);
            let header = {
                headers: {'content-type': 'multipart/form-data'}
            };
            axios.post("/api/editMovie",formData,header).then(res=>{
                if(res.data.success){
                    alert("Edit Succeed")
                }else{
                    alert(res.data.msg);
                }
            })
        }
    }

    handleFoodEditSubmit(){
        if(this.state.foodAddflag){
            let formData = new FormData();
            console.log(this.state.current.name,this.state.current.price,this.state.current.calories,this.state.current.image)
            formData.append("name",this.state.current.name);
            formData.append("price",parseInt(this.state.current.price));
            formData.append("calories",this.state.current.calories);
            formData.append("image",this.state.current.image);
            let header = {
                headers: {'content-type': 'multipart/form-data'}
            };
            axios.post("/api/addFood",formData,header).then(res=>{
                if(res.data.success){
                    alert("Add Succeed")
                }else{
                    alert(res.data.msg);
                }
            }).then(res=>{
                this.setState({
                    foodAddFlag:false,
                    foodEditShow:false,
                    current:{}
                })
            })
        }else{
            let formData = new FormData();
            formData.append("name",this.state.current.name);
            formData.append("price",this.state.current.price);
            formData.append("id",this.state.current.id);
            formData.append("calories",this.state.current.calories);
            formData.append("image",this.state.current.image);
            let header = {
                headers: {'content-type': 'multipart/form-data'}
            };
            axios.post("/api/editFood",formData,header).then(res=>{
                if(res.data.success){
                    alert("Edit Succeed")
                }else{
                    alert(res.data.msg);
                }
            })
        } 
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            current: {
                ...this.state.current,
                [event.target.name]: event.target.value
            }
        })
    }
    DeleteMovie(value){
        console.log(value);
        let formData = new FormData();
        let header = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append("id",parseInt(value.id));

        axios.post("/api/deleteMovie",formData,header).then(res=>{
            if(res.data.success){
                alert("Delete Succeed！")
            }else{
                alert("Delete Failed！")
            }
        })
    }

    DeleteFood(value){
        let formData = new FormData();
        let header = {
            headers: {'content-type': 'multipart/form-data'}
        };
        formData.append("id",parseInt(value.id));
        
        axios.post("/api/deleteFood",formData,header).then(res=>{
            if(res.data.success){
                alert("Delete Succeed！")
            }else{
                alert("Delete Failed！")
            }
        })
    }

    handleshowMovieAdd(){
        this.setState({
            movieEidtShow: true,
            movieAddFlag: true,
        })
    }

    handleshowFoodAdd(){
        this.setState({
            foodEditShow: true,
            foodAddflag: true,
        })
    }

    onPageNumChange(value){
        console.log(value);
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-md">
                        <button onClick={this.handleshowMovieAdd}>Add Movie</button><button onClick={this.handleshowFoodAdd}>Add Food</button>
                        <table className="table table-dark table-striped">
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
                                    <tr key={index}>
                                        <th>{value.id}</th>
                                        <th>{value.name}</th>
                                        <th>{value.price}</th>
                                        <th>{value.description}</th>
                                        <th>{<img src={value.image} height={100} width={100}/>}</th>
                                        <th><button onClick={this.handleshowMovieEdit.bind(this,value)}>Modify</button> - <button onClick={this.DeleteMovie.bind(this,value)}>Delete</button></th>
                                    </tr>
                                    );
                                })
                            }
                            <Pagination current={1}
                                            total={10}
                                            onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
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
                                        <tr key={index}>
                                            <th>{value.id}</th>
                                            <th>{value.name}</th>
                                            <th>{value.price}</th>
                                            <th>{value.calories}</th>
                                            <th>{<img src={value.image} height={100} width={100}/>}</th>
                                            <th><button onClick={this.handleshowFoodEdit.bind(this,value)}>Modify</button> - <button onClick={this.DeleteFood.bind(this,value)}>Delete</button></th>
                                        </tr>
                                    );
                                })
                            }
                            <Modal show={this.state.movieEidtShow} onHide={this.handleMovieEditClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Edit Movie Info</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <form >
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
                                            Description
                                            <input type="text"
                                                className="form-control"
                                                name="description"
                                                value={this.state.current.description}
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
                                    <button className="btn btn-primary" onClick={this.handleMovieEditSubmit}>Submit</button>
                                </Modal.Body>
                            </Modal>
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
                        </table>
                </div>
            </React.Fragment>
        );
    }

}
