import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";

// import { Navbar } from './components';
// import Navbar from './components/Navbar/Navbar';
// import Products from './components/products/Products'

import { Navbar, Products, Cart, Checkout } from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Product from "./components/products/product/Product";
import { set } from "react-hook-form";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMassage, setErrorMassage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handleUpdateQuantity = async (ProductId, quantity) => {
    const { cart } = await commerce.cart.update(ProductId, quantity);

    setCart(cart);
  };

  const handleRemove = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };
  const handleEmptyFromCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      );
      console.log("hi");
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMassage(error.data.error.massage);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <div>
      <Router>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleEmptyFromCart={handleEmptyFromCart}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemove={handleRemove}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
              cart={cart}
              onCaptureCheckout={handleCaptureCheckout}
              order={order}
              error={errorMassage}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
