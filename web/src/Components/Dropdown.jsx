import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const Dropdown = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogout = () => {
    signOut(auth);
    setIsOpen(false);
  };

  const redirectProfile = () => {
    window.location.href = "/profile";
  };

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const fetchData = async () => {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("No such document!");
          }
        } catch (error) {
          console.error("Error getting document:", error);
        }
      };
      fetchData();
    } else {
    }
  });

  return (
    <div className="relative inline-block text-left ">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center w-full p-2 px-4 text-sm font-medium text-gray-700 bg-transparent border-none rounded-md shadow-none "
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          type="button"
        >
          {userData ? (
            <img src={userData.icon} className="w-[100px]"></img>
          ) : (
            ""
          )}
        </button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md bg-white z-[100]">
          <div></div>
          <div
            className=""
            role="menu"
            aria-orientation="vertical"
            aria-aria-labelledby="options-menu"
          >
            {isLoggedIn ? (
              <div>
                <div className="">
                  <button
                    onClick={redirectProfile}
                    className="flex items-center w-full gap-5 px-4 py-2 text-sm text-left text-gray-700 transition duration-300 hover:bg-gray-100 hover:text-gray-900"
                    role="menuItem"
                  >
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
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full gap-5 px-4 py-2 text-sm text-left text-gray-700 transition duration-300 hover:bg-gray-100"
                  >
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
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <span className="block w-full px-4 py-2 text-sm text-left text-gray-700">
                Not Logged In
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
