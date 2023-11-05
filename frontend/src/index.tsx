import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { store } from "./app/store";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "./index.scss";
import { ErrorBoundary } from "./components/Common";
import { BrowserRouter as Router } from "react-router-dom";

//Stripe
const STRIPE_KEY: string = process.env.REACT_APP_STRIPE_KEY as string;
const stripePromise = loadStripe(STRIPE_KEY);

//React-Query-Client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Elements stripe={stripePromise}>
          <Router>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </Router>
        </Elements>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
