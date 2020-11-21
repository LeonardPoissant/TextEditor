import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore"
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./reducers/firebasereducer";
import { BrowserRouter } from "react-router-dom";

import App from "./Components/App";
import * as serviceWorker from "./serviceWorker";

import EditorProvider from "./Utils/EditorContext";

require("dotenv").config();





const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
firebase.initializeApp(firebaseConfig);
firebase.firestore();
const rrfConfig={
  userProfile:"users"
};


const initialState ={};
const store = createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const rrfProps ={
  firebase, 
  config: rrfConfig,
  dispatch: store.dispatch
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
    <EditorProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </EditorProvider>
    </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>
  ,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
