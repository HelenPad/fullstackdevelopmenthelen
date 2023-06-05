import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Shop from "./Components/Shop";
import Cart from "./Components/Cart";
import "./style/shop.css";

const App = () => {
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);
  const [warning, setWarning] = useState(false);

  const handleClick = (item) => {
    let isPresent = false;
    cart.forEach((product) => {
      if (item.id === product.id) isPresent = true;
    });
    if (isPresent) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 2000);
      return;
    }
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    let ind = -1;
    cart.forEach((data, index) => {
      if (data.id === item.id) ind = index;
    });
    const tempArr = cart;
    tempArr[ind].amount += d;

    if (tempArr[ind].amount === 0) tempArr[ind].amount = 1;
    setCart([...tempArr]);
  };

  return (
    <React.Fragment>
      <Navbar size={cart.length} setShow={setShow} />
      {show ? (
        <Shop handleClick={handleClick} />
      ) : (
        <Cart cart={cart} setCart={setCart} handleChange={handleChange} />
      )}
      {warning && (
        <div className="warning">Item is already added to your cart</div>
      )}
      {/* <Navbar />
      <Shop />
      <Cart /> */}
    </React.Fragment>
  );
};

export default App;
