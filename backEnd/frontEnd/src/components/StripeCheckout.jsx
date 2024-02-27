import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";

import { useNavigate } from "react-router-dom";

const promise = loadStripe(
  "pk_test_51N53WdHcZ821N7Jdw7hPSl4brjbeBjhYxoZg2oMPJuZ18vYsFxzhYN6SVo4tUdKakCb8flVGEcWt84ZDySblafgY001W3r0gc6"
);

const CheckoutForm = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext();
  const { myUser } = useUserContext();
  const navigate = useNavigate();
  // stripe stuff
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  async function createPaymentIntent(params) {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create_Payment_intent",
        JSON.stringify({ cart, shipping_fee, total_amount })
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      // console.log(error.response);
    }
  }
  useEffect(() => {
    createPaymentIntent();
    // eslint-disable-next-line
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment faild ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      setTimeout(() => {
        clearCart();
        navigate("/");
      }, 10000);
    }
  };
  return (
    <div>
      {succeeded ? (
        <article>
          <h4>Thank You</h4> <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page</h4>
        </article>
      ) : (
        <article>
          <h4>Hello , {myUser && myUser.name}</h4>
          <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
          <p>Test Card Number : 4242 4242 4242 4242</p>
        </article>
      )}
      <form action="" id="payment-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button disabled={processing || disabled || succeeded} id="submit">
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>

        {/* Error */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}

        {/* success */}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          payment resieved successfully , see the result in your
          <a href={`https://dashboard.stripe.com/test/payments`} target="blank">
            {" "}
            Stripe dashboard{" "}
          </a>
          Refresh the page to pay again
        </p>
      </form>
    </div>
  );
};

const StripeCheckout = () => {
  return (
    <Wrapper>
      {/* <div>
        <h2> Shipping info</h2>
        <form action="">
          <div>
            <label htmlFor=""> Delivery address</label>
            <input type="text" />
          </div>
          <label htmlFor=""> City</label>
          <select name="" id="">
            <option value="Lagos">Lagos</option>
            <option value="Benin">Benin</option>
            <option value="Abuja">Abuja</option>
            <option value="ibadan">ibadan</option>
          </select>
          <div>
            <label htmlFor="">Phone Number 1</label>
            <input type="tel" />
            <label htmlFor="">Phone Number 2</label>
            <input type="tel" />
          </div>
        </form>
      </div> */}

      <div className="mt-4 flex flex-col bg-gray-100 rounded-lg p-4 shadow-sm">
        <h2 className="text-black font-bold text-base">
          Shipping Label Address Form
        </h2>

        <div className="mt-4">
          <label className="text-black" for="name">
            Receivers Name
          </label>
          <input
            placeholder="Your name"
            className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
            type="text"
          />
        </div>

        <div className="mt-4">
          <label className="text-black" for="address">
            Address
          </label>
          <textarea
            placeholder="Your address"
            className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
            id="address"
          ></textarea>
        </div>

        <div className="mt-4 flex flex-row space-x-2">
          <div className="flex-1">
            <label className="text-black" for="city">
              City
            </label>
            <input
              placeholder="Your city"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              id="city"
              type="text"
            />
          </div>

          <div className="flex-1">
            <label className="text-black" for="state">
              State
            </label>
            <input
              placeholder="Your state"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              id="state"
              type="text"
            />
          </div>
        </div>

        {/* adding zip code */}

        {/* <div className="mt-4 flex flex-row space-x-2">
          <div className="flex-1">
            <label className="text-black" for="zip">
              ZIP
            </label>
            <input
              placeholder="Your ZIP code"
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              id="zip"
              type="text"
            />
          </div> */}
        {/* selecting countries */}
        {/* <div className="flex-1">
            <label className="text-black" for="country">
              Country
            </label>
            <select
              className="w-full bg-white rounded-md border-gray-300 text-black px-2 py-1"
              id="country"
            >
              <option value="">Select a country</option>
              <optgroup label="Africa">
                <option value="AF">Afghanistan</option>
                <option value="DZ">Algeria</option>
                <option value="AO">Angola</option>
                ...
                <option value="ZW">Zimbabwe</option>
              </optgroup>
              <optgroup label="Asia">
                <option value="AM">Armenia</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BH">Bahrain</option>
                ...
                <option value="YE">Yemen</option>
              </optgroup>
              <optgroup label="South America">
                <option value="AR">Argentina</option>
                <option value="BO">Bolivia</option>
                <option value="BR">Brazil</option>
                ...
                <option value="VE">Venezuela</option>
              </optgroup>
              ...
            </select>
          </div>
        </div> */}

        <div className="mt-4 flex justify-end">
          <button
            className="bg-white text-black rounded-md px-4 py-1 hover:bg-gray-200 hover:text-gray-900"
            type="submit"
          >
            Submit
          </button>
        </div>
      </div>

      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 3rem;
  margin: 3rem 0;
  form {
    width: 30vw;
    align-self: center;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`;

export default StripeCheckout;
