import { useEffect, useState } from "react";
import InternshipList from "../Components/InternshipList";
import Login from "../Components/Login";
import { Auth } from "../routes/auth";
import { auth, googleProvider } from "../config/firebase.js";
import {
  onAuthStateChanged,
  getAuth
} from "firebase/auth";

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
  const email = ""

  if(auth.currentUser.email != null) {
    const email = auth.currentUser.email;
  }
  else{
    const email = "";
  }


  user.photoURL = `https://ui-avatars.com/api/?name=${email[0]}&&background=random`
  if (user) {
    
  } else {
    <Login></Login>
  }
  return (
    <div className="container mx-auto p-6">
      <img src={user.photoURL} alt="" />
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
};
export default Main;
