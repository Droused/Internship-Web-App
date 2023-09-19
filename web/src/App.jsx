import React, { useState, useEffect } from "react";
import InternshipList from "./Components/InternshipList";

function App() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    // Replace with the correct URL of your server's endpoint
    const serverEndpoint = "http://localhost:5173/simplifyjobs";

    // Fetch data from your server
    fetch(serverEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        return response.json();
      })
      .then((data) => {
        // Set the fetched data in the state
        setInternships(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


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
