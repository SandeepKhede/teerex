
import Home from "./Home";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
function App() {
  const [cartItems, setCartitems] = useState([]);

  const handleAddtocart = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
if(product.quantity!==0){
    if (productExist) {
      alert("Product is alredy in the cart!");
    } else {
      setCartitems([...cartItems, { ...product, productinCart: 1 }]);
      console.log(cartItems);
    }
  }
  else{
    alert("Product is out of stock please try after some time!");

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
     
    } else {
      alert("Product is out of stock please try after some time!");
    }
  };

  const handleReduce = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if (productExist.productinCart === 1) {
      setCartitems(cartItems.filter((item) => item.id !== product.id));
     
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

        <Routes>

        <Route path="/Cart" element={<Cart cartItems={cartItems}
            handleAdd={handleAdd}
            handleReduce={handleReduce}
            handleDelete={handleDelete}
            totalQuantity={totalQuantity} />} />

        <Route path="/" element={<Home cartItems={cartItems}
            handleAddtocart={handleAddtocart}
            totalQuantity={totalQuantity} />} />
        </Routes>
    
    </>
  );
}

export default App;
