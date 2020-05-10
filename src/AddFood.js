import React from "react";
import axios from "axios";
import {Modal} from "react-bootstrap";


export default class AddFood extends React.Component {

    constructor(props) {
        super(props);
        this.handleAddFood = this.handleAddFood.bind(this);
        this.state = {
            current:{},
            foodAddFlag:false,
            foodEditShow:false,
        }
    }

    handleAddFood(){
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
    }

    handleFoodEditClose(){
        this.setState({
            foodEditShow: false
        })
    }
    render() {

        return(
            <React.Fragment>
                <button> ADD FOOD</button>
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
            </React.Fragment>
        );

    }

}
