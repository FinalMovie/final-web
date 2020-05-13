import React from "react";
import "./WhatNew.css";

export default class WhatNew extends  React.Component {


    render () {

        return(
            <React.Fragment>
                <div className="newBG">
                    <div className="slidershow middle">
                        <div className="slides">
                            <input type="radio" name="r" id="r1" checked/>
                            <input type="radio" name="r" id="r2"/>
                            <input type="radio" name="r" id="r3"/>
                            <input type="radio" name="r" id="r4"/>
                            <input type="radio" name="r" id="r5"/>
                            <div className="slide s1">
                                <img src="https://i.pinimg.com/474x/43/4e/d7/434ed75cd410bcf8894821f34299cf73.jpg" alt=""/>
                            </div>
                            <div className="slide">
                                <img src="https://i.pinimg.com/474x/a2/5b/4a/a25b4ae8e03c4b2ebd06d861a082956a.jpg" alt=""/>
                            </div>
                            <div className="slide">
                                <img src="https://i.pinimg.com/474x/2b/22/92/2b2292624333d5ab668197c00abb087f--screen-shot-popcorn.jpg" alt=""/>
                            </div>
                            <div className="slide">
                                <img src="https://i.pinimg.com/474x/c0/13/46/c013463378daafa078374a000684a520--poster-design-art-design.jpg" alt=""/>
                            </div>
                            <div className="slide">
                                <img src="https://i.pinimg.com/474x/2a/c3/cc/2ac3cc627d0200f4c748c845b4cd9d1b.jpg" alt=""/>

                            </div>
                        </div>
                        <div className="navigation">
                            <label htmlFor="r1" className="bar"></label>
                            <label htmlFor="r2" className="bar"></label>
                            <label htmlFor="r3" className="bar"></label>
                            <label htmlFor="r4" className="bar"></label>
                            <label htmlFor="r5" className="bar"></label>
                        </div>
                    </div>
                    <div className = "slides r">
                        <p className="movieText">More Movies Coming Soon</p>
                    </div>
                </div>
            </React.Fragment>
        );

    }


}
