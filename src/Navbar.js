import React from 'react'
import "./Navbar.css"
const Navbar = ({ cartItems, totalQuantity, open }) => {
  const totalQty = totalQuantity(cartItems);
  console.log(totalQty)
  return (
    <div className="navbar">
        <div className="logo">Teerex Store</div>
        <ul>
            <li>Products</li>
            <li><span
              className="fa-stack fa-1x has-badge"
              data-count={cartItems.length ? totalQty : "0"}
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa fa-shopping-cart "
              ></i>
            </span></li>
        </ul>
    </div>
  )
}

export default Navbar