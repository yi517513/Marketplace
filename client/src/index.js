import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "../src/redux/store/store";
import Modal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import { CountdownProvider } from "./context/CountdownContext";
import { AuthProvider } from "./context/AuthContext";
import { NotifyProvider } from "./context/NotifyContext";
import { FetchApiProvider } from "./context/FetchApiContext";
import { ApiCallbackProvider } from "./context/ApiCallbackContext";
import { CreateApiProvider } from "./context/ApiRequestContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

Modal.setAppElement("#root");

root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
        <CountdownProvider>
          <NotifyProvider>
            <ApiCallbackProvider>
              <CreateApiProvider>
                <FetchApiProvider>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </FetchApiProvider>
              </CreateApiProvider>
            </ApiCallbackProvider>
          </NotifyProvider>
        </CountdownProvider>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
