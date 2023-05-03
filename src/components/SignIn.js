import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";



function SignIn() {
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);


  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(`You've successfully signed up, ${userCredential.user.email}!`);
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`);
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`You've successfully signed in as ${userCredential.user.email}!`);
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}!`);
      });
  }

  function doSignOut() {
    signOut(auth)
      .then(function () {
        setSignOutSuccess(`You have successfully signed out!`);
      }).catch(function (error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
    <React.Fragment>
      <h1>Sign up</h1>
      {signUpSuccess}
      <form onSubmit={doSignUp}>
        <input
          type='text'
          name='email'
          placeholder='email' />
        <input
          type='password'
          name='password'
          placeholder='Password' />
        <button type='submit'>Sign up</button>
      </form>

      <h1>Sign In</h1>
      {signInSuccess}
      <form onSubmit={doSignIn}>
        <input
          type="text"
          name="signinEmail"
          placeholder="email" />
        <input
          type="password"
          name="signinPassword"
          placeholder="Password" />
        <button type="submit">Sign in</button>

        <h1>Sing Out</h1>
        {signOutSuccess}
        <br />
        <button onClick={doSignOut}>Sign out</button>
      </form>
    </React.Fragment>
  );
}

//Take note that when auth.currentUser is set to a signed in user, that user is a User object that extends functionality from the UserInfo class. These classes contain properties that store the user's personal information, like their email, display name, phone number, and photo URL. That's the making of a user profile right there! Currently, we only gather an email and password, so if you want to add functionality for a user profile, you'll have to explore that in a project you create for this course section, or on your own.

export default SignIn;