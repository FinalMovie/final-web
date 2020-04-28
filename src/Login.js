import React from "react";

export default class Login extends React.Component{

    render() {
        return(
            <React.Fragment>
                {/* React.Component> Login组件已经继承了component，这里不能出现compoment 他不是一个html元素，应该使用Fragment*/}
                {/* <body> */}
                <p>SHUT OFF</p>
                <h1>CCCCCC</h1>
                {/* </body>  body标签不能出现在组件当中 一个html页面只能有一个body */}
            </React.Fragment>
        );
    }
}
