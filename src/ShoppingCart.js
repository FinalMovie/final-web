import * as React from "react";

export default class ShoppingCart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                {
                    <div className="container">
                        <h2>My Shopping Cart</h2>
                    </div>
                }
            </React.Fragment>
        );
    }
}
