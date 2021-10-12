import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Review from "./Review";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  shippingData,
  checkoutToken,
  backStep,
  onCaptureCheckout,
  nextStep,
}) => {
  const hendleSubmit = async (e, elements, stripe) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log(error);
    } else {
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          fristname: shippingData.fristName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: "primary",
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.subdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.country,
        },
        fulfillment: { shipping_method: shippingData.shippingOptions },
        payment: {
          geteway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      };
      console.log(orderData);
      onCaptureCheckout(checkoutToken.id, orderData);
      nextStep();
    }
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom>
        Payment Method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => hendleSubmit(e, elements, stripe)}>
              <CardElement />
              <br />
              <br />
              <div style={{ display: "flex", justifyContent: "spece-between" }}>
                <Button variant="outline" onClick={backStep}>
                  back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={!stripe}
                  color="primary"
                >
                  pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  );
};
export default PaymentForm;
