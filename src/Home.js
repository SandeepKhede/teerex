import React, { useEffect, useState } from "react";
import "./Home.css"
import Navbar from "./Navbar";
const Home = ({ cartItems, totalQuantity, handleAddtocart }) => {
    
  const [productList, setProductlist] = useState([]);
  const [filterProducts, setFilterproducts] = useState([]);
  const [searchKeyword, setSearchkeyword] = useState("");


    const callAPI = async function fetchAPI() {
      await fetch(api)
        .then((res) => res.json())
        .then((res) => setProductlist(res))
        .catch((err) => console.log(err));
    }
  
    useEffect(()=>{
      callAPI(api)
    },[])
    
    useEffect(() => {
      setFilterproducts([...productList]);
     
    }, [productList]);

    //handle search
    const handleSearch = () => {
      const search = searchKeyword.toLowerCase();
      
      if(search !== ""){
        let filteredProducts = productList.filter((item)=>{
      return Object.values(item).join(" ").toLowerCase().includes(search)
    })
    // console.log(filteredProducts)
      setFilterproducts(filteredProducts);
    } else {
      setFilterproducts(productList);
      // console.log(productList);
    }
    };
   


   

    const handleCheck = (e) =>{
      let event = e.target.value.toLowerCase();
      console.log(event)
      if(event !== ""){
        let filteredProducts = productList.filter((item)=>{
          console.log(Object.values(item))
      return Object.values(item).join(" ").toLowerCase().includes(event)
    })
    
    // console.log(filteredProducts)
      setFilterproducts(filteredProducts);
    } else {
      setFilterproducts(productList);
      console.log(productList);
    }
    }

  

    //filter attributess
    const colorList = [...new Set(productList.map((product) => product.color))];
  const genderList = [...new Set(productList.map((product) => product.gender))];
  const typeList = [...new Set(productList.map((product) => product.type))];
  


  const filterAttributes = [
    { label: "color", value: colorList },
    { label: "gender", value: genderList },
    { label: "type", value: typeList },
    
  ];

  console.log(filterAttributes[0].value[0]);

  const api =
    "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json";

    return (
    <div className="container">

<Navbar cartItems={cartItems} totalQuantity={totalQuantity} productList={productList} handleSearch={handleSearch} />
    <div className="searchbar">
        <input
          className="input"
          type="text"
          placeholder="Search for products..."
          onChange={(e) => setSearchkeyword(e.target.value)}
        />
        <div className="space"></div>
        <button
          className="searchbutton"
          onClick={handleSearch}
        ><i class="fa-solid fa-magnifying-glass"></i></button>
    </div>


      <div className="row">
        <div className="column left" >
            <h2>Filter</h2>
            <p>Filter Using Attributes</p>

           {/*  filters Values */}
           <div className="filters">
      {filterAttributes.map((filterItems, index) => {
        return (
          <div key={index}>
            <div className="title">{filterItems.label.toUpperCase()}</div>
            <div className="coloroption">
              {filterItems.value.map((ele, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={ele}
                    onChange={(e) => handleCheck(e)}

                    
                  />
                  {ele}
                </label>
              ))}
            </div>
          </div>
        );
      })}
    </div>


        </div>
        <div className="column middle" >
            <h2>Total Product</h2>
            

            <div className="products">
      <div className="row">
        {filterProducts.length ? (
          filterProducts.map((product) => (
            <div className="card" key={product.id}>
              <div className="card-header">
                <span className="card-title">{product.name}</span>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className="card-body">
                <p>Rs.{product.price}</p>
                <button
                  className="btn"
                  onClick={() => handleAddtocart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <h4 style={{ color: "grey" }}>No Products Found</h4>
        )}
      </div>
    </div>


        </div>
        
        </div>

    </div>
  )
}

export default Home