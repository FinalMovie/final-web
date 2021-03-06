import React from "react";
import "./home.css";
import {Link} from "react-router-dom";
import axios from "axios";

// const URL = "http://getwallpapers.com/wallpaper/full/9/8/8/529635.jpg";


export default class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        };
    }


    render() {
        return (
            <React.Fragment>

                <div className="bg">
                    <div className="content">
                        <h1>Welcome</h1>
                        <h3>The Best Place to Enjoy Movies</h3>
                        <Link to="/Movie">
                            <button className="btn btn-info btn-lg"> Get Started!
                            </button>
                        </Link>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

