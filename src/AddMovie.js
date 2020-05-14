import React from "react";
import axios from 'axios';
import "./Movie.css";
import {Modal,Button,Form} from 'react-bootstrap';
import Pagination from 'rc-pagination';
import {unstable_batchedUpdates} from "react-dom";


export default class AddMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listMovie: [],
            currentPage:0,
            pageSize: 10,
            total:10,
            movieEidtShow: false,
            foodEditShow: false,
            current:{},
            movieAddFlag:false,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleMovieEditClose = this.handleMovieEditClose.bind(this);

        this.handleMovieEditSubmit = this.handleMovieEditSubmit.bind(this);

        this.handleshowMovieAdd = this.handleshowMovieAdd.bind(this);

    }

    componentDidMount() {
        axios.get("/api/movieList?size="+this.state.pageSize+"&page="+this.state.currentPage).then(res => {
            console.log(123,res.data,res.data.data.totalPages)
            if (res.data.success) {
                this.setState({
                    listMovie: res.data.data.content,
                    total: res.data.data.totalPages*this.state.pageSize
                });
            } else {
                alert("FAILED to LOAD DATA！");
            }
        })

    }


    handleMovieEditClose(){
        this.setState({
            movieEidtShow: false
        })
    }

    handleshowMovieEdit(value){
        console.log(value);
        this.setState({
            movieEidtShow: true,
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



    handleshowMovieAdd(){
        this.setState({
            movieEidtShow: true,
            movieAddFlag: true,
        })
    }

    onPageNumChange(value){
        console.log(value);
        this.setState({
            currentPage: value-1,
        })
        let page = value - 1;
        axios.get("/api/movieList?size="+this.state.pageSize+"&page="+page).then(res => {
            console.log(123,res.data,res.data.data.totalPages)
            if (res.data.success) {
                this.setState({
                    listMovie: res.data.data.content,
                    total: res.data.data.totalPages*this.state.pageSize
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
                    <button onClick={this.handleshowMovieAdd}>Add Movie</button>
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
                        </tbody>
                        <tfoot>      
                            <Pagination current={this.state.currentPage+1}
                                            total={this.state.total}
                                            onChange={(pageNum) => {this.onPageNumChange(pageNum)}}/>
                        </tfoot>
                    </table>
                </div>
                })
            </React.Fragment>
        );
    }

}
