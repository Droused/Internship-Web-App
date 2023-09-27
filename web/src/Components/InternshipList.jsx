import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

const InternshipList = ({ internships }) => {
  const [favorites, setFavorites] = useState([]);

  const handleFavoriteClick = (index, internship) => {
    // var internshipObject = internships[index]
    favorites.push(internship)
    console.log(favorites)
    console.log(internship)
    // if (favorites.includes(internship)) {
    //   setFavorites(favorites.filter(fav => fav !== internship));
    // } else {
    //   setFavorites([...favorites, internship]);
    // }
    // console.log(favorites)
  };


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
                      onClick={() => handleFavoriteClick(index, internship)}
                      className="ml-2 focus:outline-none"
                    >
                      {(favorites.includes(internship[index])) ? (
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
