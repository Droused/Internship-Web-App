import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaUser, FaEnvelope, FaCog, FaHeart } from "react-icons/fa";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

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

  if (!userData)
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <div className="p-4 text-xl text-center text-gray-500">Loading...</div>
      </div>
    );

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-6">
          <img
            className="w-24 h-24 rounded-full"
            src={userData.icon}
            alt="User Avatar"
          />
        </div>
        <div className="flex items-center mb-6 text-center">
          <FaUser className="mr-2 text-2xl text-indigo-500" />
          <div className="text-2xl font-semibold text-gray-700">
            User Profile
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center text-gray-500">
            <FaUser className="mr-2 text-indigo-500" />
            <strong className="mr-1">Name:</strong> {userData.name}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center text-gray-500">
            <FaEnvelope className="mr-2 text-indigo-500" />
            <strong className="mr-1">Email:</strong> {userData.email}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center text-gray-500">
            <FaCog className="mr-2 text-indigo-500" />
            <strong className="mr-1">Preferences:</strong>{" "}
            {JSON.stringify(userData.preferences)}
          </div>
        </div>
        <div className="mt-6">
          <div className="flex items-center mb-4">
            <FaHeart className="mr-2 text-2xl text-red-500" />
            <div className="text-2xl font-semibold text-gray-700">
              Favorites
            </div>
          </div>
          <ul className="space-y-2">
            {userData.favorites && userData.favorites.length > 0 ? (
              userData.favorites.map((favorite, index) => (
                <li
                  key={index}
                  className="p-2 transition-all duration-300 rounded-md cursor-pointer hover:bg-gray-100"
                >
                  <div className="text-gray-700">{favorite.name}</div>
                  <div className="text-sm text-gray-500">
                    {favorite.details}
                  </div>
                </li>
              ))
            ) : (
              <div className="text-gray-500">No favorites added yet.</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
