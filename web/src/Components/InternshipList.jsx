import React, { useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import getDoc
import { db } from "../config/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const InternshipList = ({ internships }) => {
  const [favorites, setFavorites] = useState([]);
  const [userData, setUserData] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userData && userData.uid) {
      const fetchFavorites = async () => {
        try {
          const userDoc = await db.collection("users").doc(userData.uid).get();
          if (userDoc.exists && userDoc.data().favorites) {
            // Check if favorites exist
            setFavorites(userDoc.data().favorites);
          } else {
            setFavorites([]); // Set to empty array if favorites do not exist
          }
        } catch (error) {
          console.error("Error fetching favorites: ", error);
        }
      };

      fetchFavorites();
    }
  }, [userData]);

  const handleFavoriteClick = async (internship) => {
    try {
      let updatedFavorites;
      if (favorites.includes(internship)) {
        updatedFavorites = favorites.filter((fav) => fav !== internship);
      } else {
        updatedFavorites = [...favorites, internship];
      }
      await db
        .collection("users")
        .doc(userData.uid)
        .set({ favorites: updatedFavorites }, { merge: true });

      setFavorites(updatedFavorites);
    } catch (error) {
      console.error("Error updating favorites: ", error);
    }
  };
  if (userData) {
    const fetchData = async () => {
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          await setDoc(userDocRef, { favorites: [] });
          setUserData({ favorites: [] });
        }
      } catch (error) {
        console.error("Error getting document:", error);
      }
    };
    fetchData();
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-semibold text-center text-blue-600">
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
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="flex items-center">
                    <div className="text-sm font-semibold text-gray-900">
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
                  <div className="text-xs text-gray-500">{internship.role}</div>
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
