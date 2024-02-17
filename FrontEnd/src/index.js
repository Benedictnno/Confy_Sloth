import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "../src/context/products_context";
import { FilterProvider } from "../src/context/filter_context";
import { CartProvider } from "../src/context/cart_context";
import { UserProvider } from "../src/context/user_context";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
// dev - iky1on1kgxgf78vh.us.auth0.com;  domain

// 1c9kAOXOL5FSV6i0R4vNg4dn02wcTAIu id
root.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={window.location.origin}
    cacheLocation="localstorage"
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
