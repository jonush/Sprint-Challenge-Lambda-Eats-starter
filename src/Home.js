import React from 'react'
import {Link} from 'react-router-dom'


const Homepage = () => {

    return(
        <div>
            <h2>Order a pizza!</h2>
            <Link to='/pizza'>Order Now!</Link>
        </div>
    )
}

export default Homepage;