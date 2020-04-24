import React from "react";

function Order({ details }) {
    return (
        <div className="confirmed">
            <h1>We got your order!</h1>
            <h2>We'll notify you when your pizza is on the way.</h2>
            <h3>Order for: {details.name}</h3>
            <h3>Size: {details.size}</h3>

            <pre>{JSON.stringify({details}, null, 2)}</pre>
        </div>
    );
}

export default Order;
