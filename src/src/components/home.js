import React from "react";
import "../css/home.css";
// import Login from "./components/Login";

const URL = "http://getwallpapers.com/wallpaper/full/9/8/8/529635.jpg";


export default class home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        };
    }

    handleDirect(event) {
        event.preventDefault();
        // if (!this.state.isClicked) {
        //     return <Redirect to='/Movie' />
        // }
        // this.setState({
        //     isClicked:true
        // })
    }

    render() {
        return (
            <React.Fragment>
                {/*<body>*/}


                {/*</body>*/}
                <div className="bg">
                    <div className="content">
                        <h1>Welcome222</h1>
                        <h3>The Best Place to Enjoy Movies</h3>
                        <button className="btn btn-info btn-lg" onClick={this.handleDirect}> Get Started!
                        </button>
                    </div>
                    <p className="copyright">@Copyright 2020 Reserved By Triton</p>
                </div>
            </React.Fragment>
        );
    }

}

