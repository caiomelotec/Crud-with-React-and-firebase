import GoogleButton from 'react-google-button';
import "./Auth.css"
import { auth, googleProvider } from "../config/firebase"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";
import { useState } from "react";

export const Auth = ({ getMovieList }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //console.log(auth?.currentUser?.email)

  const signIn = async () => {
    //e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const Login = async () => {
    //e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      getMovieList();
    } catch (err) {
      console.log(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      getMovieList()
    } catch (err) {
      console.log('not working')
    }
  }

  const logOut = async () => {
    try {
      await signOut(auth)
      window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div>
      <div className="input-container">
        <h1>Create Account</h1>
        <form className="email">
          <input placeholder="Email..." onChange={(e) => setEmail(e.target.value)} />
        </form>
        <form className="password">
          <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
        </form>
        <button onClick={signIn}>Sign In</button>
      </div>


      <div className='login-form'>
        <h1>Log In</h1>
        <form className="email">
          <input placeholder="Email for Login" onChange={(e) => setEmail(e.target.value)} />
        </form>
        <form className="password">
          <input type="password" placeholder="Password..." onChange={(e) => setPassword(e.target.value)} autoComplete="off" />
        </form>
        <button onClick={Login}>Login In</button>
        <GoogleButton onClick={signInWithGoogle} />
      </div>

      <div className="btns">
        <button onClick={logOut}>LogOut</button>

      </div>
    </div>
  )
}
