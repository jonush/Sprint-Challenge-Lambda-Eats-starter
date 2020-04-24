import React from 'react'

function Order({ details }) {
  return (
    <div>
      <h2>{details.name}</h2>
      <h2>Email: {details.size}</h2>
      <div>
            <h2>Toppings:</h2>
            <p>{details.cheese}</p>
            <p>{details.pepperoni}</p>
            <p>{details.pineapple}</p>
            <p>{details.bacon}</p>
      </div>
      <h2>Special Instructions: {details.special}</h2>
    </div>
  )
}

export default Order;