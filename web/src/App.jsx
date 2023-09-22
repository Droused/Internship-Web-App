import React, { useState, useEffect } from "react";
import InternshipList from "./Components/InternshipList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InternshipList from "../Components/InternshipList";
import Login from "./login";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const serverEndpoint = "http://localhost:5174/simplifyjobs";

    fetch(serverEndpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }
        return response.json();
      })
      .then((data) => {
        setInternships(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="container p-6 mx-auto">
      <h1 className="mb-6 text-4xl font-bold text-center">InternshipsForYou</h1>
      <div className="flex justify-center">
        <input
          type="text"
          className="w-full p-3 transition duration-300 border rounded-md lg:w-1/2 xl:w-1/3 focus:outline-none focus:border-slate-600"
          placeholder="Search Company, Location, Date..."
        />
      </div>
      <div className="mt-8">
        <InternshipList internships={internships} />
        <div></div>
      </div>
    </div>
  );
}
