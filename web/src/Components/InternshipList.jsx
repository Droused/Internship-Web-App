import React from "react";

const InternshipList = ({ internships }) => {

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
                  <div className="text-sm font-semibold text-gray-900">
                    {internship.company}
                  </div>
                  <div className="text-xs text-gray-500">{internship.role}</div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="text-sm font-semibold text-gray-900">
                    {internship.location && internship.location.length > 0 ? (
                      internship.location.map((location, idx) => (
                        <div key={idx}>{location}</div>
                      ))
                    ) : (
                      "N/A"
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <div className="text-sm text-gray-500">
                    {internship.datePosted}
                  </div>
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <a
                    href={internship.applicationLink}
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
