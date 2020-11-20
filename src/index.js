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

const firebaseConfig = {
  apiKey: "AIzaSyBZiI_5sDTd6MTKMLgj96eM4SATSMbnD40",
  authDomain: "pantry-1653b.firebaseapp.com",
  databaseURL: "https://pantry-1653b.firebaseio.com",
  projectId: "pantry-1653b",
  storageBucket: "pantry-1653b.appspot.com",
  messagingSenderId: "343891773598",
  appId: "1:343891773598:web:9533c2411f22e9de4f538f",
  measurementId: "G-VVRZXDL7Z8"
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
