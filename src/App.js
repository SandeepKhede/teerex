import Navbar from "./Navbar";
import Home from "./Home";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
function App() {
  const [cartItems, setCartitems] = useState([]);

  const handleAddtocart = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
if(product.quantity!==0){
    if (productExist) {
      alert("Product is alredy in the cart, please check the shopping cart!");
    } else {
      setCartitems([...cartItems, { ...product, productinCart: 1 }]);
      console.log(cartItems);
    }
  }
  else{
    alert("Sorry for the inconvience, product is out of stock!");

  }


  };



  const handleAdd = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist && productExist.productinCart < product.quantity) {
      setCartitems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExist, productinCart: productExist.productinCart + 1 }
            : item
        )
      );
      // alert(`${productExist.productinCart} items in the cart!`)
    } else {
      alert("Sorry for the inconvience, product is out of stock!");
    }
  };

  const handleReduce = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist.productinCart === 1) {
      setCartitems(cartItems.filter((item) => item.id !== product.id));
      // alert("Product removed from the shopping cart!");
    } else {
      setCartitems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...productExist, productinCart: productExist.productinCart - 1 }
            : item
        )
      );
    }
  };

  const handleDelete = (product) => {
    setCartitems(cartItems.filter((item) => item.id !== product.id));
    // alert("Product removed from the shopping cart!");
  };

  const totalQuantity = (cartItems) => {
    if (!cartItems.length) return 0;

    const totalItem = cartItems
      .map((item) => item.productinCart)
      .reduce((totalItem, n) => totalItem + n);

    return totalItem;
  };


  
  return (
    <>
    
      < Navbar cartItems={cartItems}
            handleAddtocart={handleAddtocart}
            totalQuantity={totalQuantity}/>
      < Home cartItems={cartItems}
            handleAddtocart={handleAddtocart}
            totalQuantity={totalQuantity}/>
      
    </>
  );
}

export default App;
