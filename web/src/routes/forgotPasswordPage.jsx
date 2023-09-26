import React, { useState } from "react";
import { sendPasswordResetEmail, onAuthStateChanged} from "firebase/auth";
import { auth } from "../config/firebase";
import { toast, Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  function handleResetPassword() {
    sendPasswordResetEmail(auth, email);
    toast.success("Successfully sent to your email!");
    setResetEmailSent(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        window.location="/"
        const uid = user.uid;
      } else {
      }
    });
  }


  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50">
      <Toaster />
      <div className="flex flex-col items-center w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center">Forgot Password</h2>
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
        <div className="flex justify-center mb-4">
          <button
            className="w-[250px] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
        </div>
        <div className="text-center">
          <span>Remember your password?</span>
          <a href="/login" className="ml-2 text-blue-500 hover:underline">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
