import React, { useState, useEffect } from "react";
import { useFirebase } from "react-redux-firebase";
import { useHistory } from "react-router-dom";
import { RootState } from "../reducers/firebasereducer";
import { useSelector } from "react-redux";

const SignIn = () => {
  const firebase = useFirebase();
  const history = useHistory();
  const user = useSelector((state:RootState)=>state.firebase.profile)
  const [ test, setTest] = useState("")
  

  const signInWithGoogle = async() => {
    firebase
      .login({
        provider: "google",
        type: "popup",
      })
      .then((user: any) => {
        setTest("TEST")

        console.log("INSIDE", test)
         
      })
      .then(()=>{
        console.log("#RD", test)
      })
     
  };
  useEffect(()=>{
    console.log('USER', user)
    if(!user.isEmpty){
      history.push(`/`);
    }
  }, [user])

  console.log('OUTSIDE', user)

  console.log("TESTOUTISDE", test)

 


  const signOutWithGoogle =() =>{
      firebase
      .logout()
  }
  return (
    <div>
      <h1>Sign In</h1>
      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
      >
        Sign In with Google
      </button>
      <button
      onClick={(event) =>{
          event.preventDefault();
          signOutWithGoogle();
      }}
      >
          Sign out with Google

      </button>
    </div>
  );
};
export default SignIn;