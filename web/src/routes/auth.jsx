import { auth, googleProvider } from "../config/firebase.js";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User signed in");

        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          email: user.email,
          favorites: {},
          locationPreferences: {},
          applicationHistory: [],
        })
          .then(() => {
            console.log("User Created!");
            setTimeout(() => {
              window.location.href = "/";
            }, 500);
          })
          .catch((error) => {
            console.error("Error creating user profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        const errorMessage = error.message;
        if (
          errorMessage.includes("invalid-email") ||
          errorMessage.includes("invalid-login-credentials")
        ) {
          toast.error("Email Or Password Is Incorrect!");
        }
      });
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      setUser(userCredential.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser != null || "") {
        console.log("User is signed in.");
        console.log(currentUser.email);
      } else {
        console.log("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-50">
      <Toaster />
      <div className="flex flex-col items-center w-full max-w-md p-6 space-y-4 bg-white rounded-lg shadow-lg">
        <img
          src="/int.png"
          alt="Company Logo"
          className="w-20 h-20 border-4 border-blue-500 rounded-full"
        />
        <h2 className="text-3xl font-semibold text-center">Login</h2>
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center pl-3 "
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <button
            className="w-[250px] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            onClick={signIn}
          >
            Sign In
          </button>
        </div>
        <div className="flex items-center justify-center mb-4">
          <button
            className="w-[250px] bg-white hover:bg-gray-200 text-blue-400 font-bold py-2 px-4 rounded-md flex items-center justify-center"
            onClick={signInWithGoogle}
          >
            <img src="/google.svg" alt="Google Logo" className="w-4 h-4" />
            <span className="w-full mr-2">Continue with Google</span>
          </button>
        </div>
        <div className="mb-4 text-center">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>
        <div className="text-center">
          <span>Don't have an account?</span>
          <a href="/register" className="ml-2 text-blue-500 hover:underline">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};
export default Auth;
