import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, googleProvider } from "../config/firebase.js";
import { toast, Toaster } from "react-hot-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in");
        const user = userCredential.user;
        window.location.href = "/login";
      })
      .catch((error) => {
        if (
          error == "FirebaseError: Firebase: Error (auth/email-already-in-use)."
        ) {
          toast.error("Email Already In Use!");
        } else if (
          (error =
            "FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).")
        ) {
          toast.error("Password Is Too Weak! Please enter 6+ Characters.");
        }
        console.error("Error signing in:", error);
      });
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 w-full">
      <Toaster />
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg flex flex-col items-center space-y-4">
        <img
          src="/int.png"
          alt="Company Logo"
          className="w-20 h-20 rounded-full border-4 border-blue-500"
        />
        <h2 className="text-3xl font-semibold text-center">Register</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Your password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4 flex justify-center">
          <button
            onClick={signIn}
            className="w-[250px] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Sign Up
          </button>
        </div>
        <div className="mb-4 flex justify-center items-center">
          <button
            className="w-[250px] bg-white hover:bg-gray-200 text-blue-400 font-bold py-2 px-4 rounded-md flex items-center justify-center"
            onClick={signInWithGoogle}
          >
            <img src="/google.svg" alt="Google Logo" className="w-4 h-4" />
            <span className="mr-2 w-full">Continue with Google</span>
          </button>
        </div>

        <div className="text-center">
          <span>Already have an account?</span>
          <a href="/login" className="text-blue-500 hover:underline ml-2">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
