import React from "react";
import InternshipList from "./Components/InternshipList";

function App() {
  const internships = [
    {
      companyName: "Company A",
      locationState: "New York",
      locationCity: "NYC",
      role: "Role A",
      datePosted: "2023-09-18",
      applicationLink: "https://example.com/apply-a",
    },
    {
      companyName: "Company B",
      locationState: "Texas",
      locationCity: "Houston",
      role: "Role B",
      datePosted: "2023-09-19",
      applicationLink: "https://example.com/apply-b",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">InternshipsForYou</h1>
      <div className="flex justify-center">
        <input
          type="text"
          className="w-full lg:w-1/2 xl:w-1/3 border rounded-md p-3 focus:outline-none focus:border-slate-600 transition duration-300"
          placeholder="Search Company, Location, Date..."
        />
      </div>
      <div className="mt-8">
        <InternshipList internships={internships} />
      </div>
    </div>
  );
}

export default App;
