import React from 'react'

import "./Navbar.css"
import { useNavigate } from 'react-router-dom';


const Navbar = ({ cartItems, totalQuantity,handleSearch, open }) => {

  const navigate = useNavigate();

  const handleProduct = () => {
    navigate("/");
    handleSearch("");
    
  };

  const handleCart = () => {
    navigate("/Cart");
  };

  const totalQty = totalQuantity(cartItems)
  // console.log(totalQty)
  return (
    <div className="navbar">
        <div className="logo">Teerex Store</div>
        <ul>
            <li onClick={handleProduct}>Products</li>
            <li onClick={handleCart}><span
              className="fa-stack fa-1x has-badge"
              data-count={cartItems.length ? totalQty : "0"}
            >
              <i
                style={{ fontSize: "20px" }}
                className="fa fa-shopping-cart "
              ></i>
            </span></li>
            {/* <Link to='/about'>Go to Aboutpage</Link> */}
        </ul>
    </div>
  )
}

export default Navbar