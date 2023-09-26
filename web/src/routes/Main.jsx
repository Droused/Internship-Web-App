import { useEffect, useState } from "react";
import InternshipList from "../Components/InternshipList";
import Login from "../Components/Login";
import { Auth } from "../routes/auth";
import { auth, googleProvider } from "../config/firebase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";

const Main = () => {
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

  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
  } else {
    <Login></Login>;
  }
  return (
    <div className="container p-6 mx-auto ">
      <div className="px-2 py-3 rounded-[25px] shadow-md bg-gradient-to-r from-blue-500 to-purple-500 flex gap-5 justify-center items-center">
        <h1 className="flex justify-center  ml-[80px] text-4xl font-bold text-center text-white">
          InternshipsForYou
        </h1>
        <div className="flex justify-center w-full p-0 m-0">
          <input
            type="text"
            className=" h-[60px] p-2 transition duration-300 border rounded-[15px] shadow-md lg:w-1/2 xl:w-[500px] focus:outline-none focus:border-slate-600 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
            placeholder="Search Company, Location, Date..."
          />
        </div>
      </div>

      <div className="mt-8">
        <InternshipList internships={internships} />
      </div>
    </div>
  );
};
export default Main;
