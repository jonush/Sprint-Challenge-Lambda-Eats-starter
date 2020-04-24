import React from 'react'
import { Link } from 'react-router-dom';

const Homepage = () => {

    return(
        <div className = "home">
            <h2>Enjoy the classics</h2>
            <Link to='/pizza' className="order">Order</Link>
        </div>
    )
}

export default Homepage;