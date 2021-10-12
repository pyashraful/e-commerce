import React from "react";
import CartItem from "./cartItem/CartItem";

import { Container, Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import useStyles from "./styles";

const Cart = ({
  cart,
  handleRemove,
  handleUpdateQuantity,
  handleEmptyFromCart,
}) => {
  // console.log(cart);

  const classes = useStyles();

  const EmptyCart = () => (
    <Typography variant="h6">
      you have no item,
      <Link to="/" className={classes.link}>
        start adding some
      </Link>
    </Typography>
  );

  const FillCart = () => (
    <>
      <Grid container spacing={4}>
        {cart.line_items.map((item) => (
          <Grid item sm={4} xs={12} key={item.id}>
            <CartItem
              item={item}
              handleUpdateQuantity={handleUpdateQuantity}
              handleRemove={handleRemove}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cartDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted_with_symbol}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            onClick={handleEmptyFromCart}
            size="large"
            color="secondary"
            type="button"
            variant="contained"
          >
            {" "}
            Empty Card
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.chackoutButton}
            size="large"
            color="primary"
            type="button"
            variant="contained"
          >
            {" "}
            Chack OUt
          </Button>
        </div>
      </div>
    </>
  );

  if (!cart.line_items) return "Loding";

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shoping Card
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FillCart />}
    </Container>
  );
};

export default Cart;
