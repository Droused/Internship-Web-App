import React from "react";

const InternshipList = ({ internships }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-4">
        Recent Listings
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">
                Company
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">
                Location(s)
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">
                Date Posted
              </th>
              <th className="px-6 py-3 border-b border-gray-300 text-left text-sm font-semibold">
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
                  <div className="text-sm font-semibold text-gray-900">
                    {internship.Company}
                  </div>
                  <div className="text-xs text-gray-500">{internship.Role}</div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="text-sm font-semibold text-gray-900">
                    {internship.Location && internship.Location.length > 0 ? (
                      internship.Location.map((location, idx) => (
                        <div key={idx}>{location}</div>
                      ))
                    ) : (
                      "N/A"
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="text-sm text-gray-500">
                    {internship.DatePosted}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <a
                    href={internship.ApplicationLink}
                    className="text-blue-600 hover:underline"
                  >
                    Apply
                  </a>
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
