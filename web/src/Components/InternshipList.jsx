import React, { useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import getDoc
import { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const InternshipList = ({ internships }) => {
  const [favorites, setFavorites] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User logged in as " + user.email);
        toast.success("Logged in as " + user.email);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFavoriteClick = async (internship) => {
    if (isLoggedIn) {
      try {
        let updatedFavorites;
        if (favorites.includes(internship)) {
          updatedFavorites = favorites.filter((fav) => fav !== internship);
          toast.error(`Removed ${internship.company} From Favorites`);
        } else {
          updatedFavorites = [...favorites, internship];
          toast.success("Added " + internship.company + " to your favorites!");
        }
        setFavorites(updatedFavorites);
      } catch (error) {
        console.error("Error updating favorites: ", error);
      }
    } else {
      toast.error("Please Login To Favorite Internships!");
    }
  };

  return (
    <div className="container px-4 mx-auto md:p-8">
      <Toaster />
      <h1 className="mb-4 text-3xl font-semibold text-center text-blue-600 md:text-4xl">
        Recent Listings
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full overflow-hidden border-collapse rounded-lg table-auto">
          <thead>
            <tr className="text-white bg-gradient-to-r from-blue-600 to-blue-400">
              <th className="px-6 py-3 text-sm font-semibold text-left border-b border-gray-300">
                Company
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left border-b border-gray-300">
                Location(s)
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left border-b border-gray-300">
                Date Posted
              </th>
              <th className="px-6 py-3 text-sm font-semibold text-left border-b border-gray-300">
                Apply
              </th>
            </tr>
          </thead>
          <tbody>
            {internships.map((internship, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="px-4 py-2 border-b border-gray-300 md:px-6 md:py-4">
                  <div className="flex items-center">
                    <div className="text-sm font-semibold text-gray-900 md:text-base">
                      {internship.company}
                    </div>
                    <button
                      onClick={() => handleFavoriteClick(internship)}
                      className="ml-2 focus:outline-none"
                    >
                      {favorites.includes(internship) ? (
                        <FaStar className="text-yellow-500" />
                      ) : (
                        <FaRegStar className="text-gray-400 hover:text-yellow-500" />
                      )}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 md:text-sm">
                    {internship.role}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="text-sm font-semibold text-gray-900">
                    {internship.jobLocation && internship.jobLocation.length > 0
                      ? internship.jobLocation.map((location, idx) => (
                          <div key={idx}>{location}</div>
                        ))
                      : "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="text-sm text-gray-500">
                    {internship.datePosted}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {internship.applicationLink ? (
                    <a
                      href={internship.applicationLink}
                      className="text-blue-600 hover:underline"
                    >
                      {" "}
                      Apply{" "}
                    </a>
                  ) : (
                    <p className="font-bold text-gray-600">Closed</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default InternshipList;
