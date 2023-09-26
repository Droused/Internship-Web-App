import { useEffect, useState } from "react";
import InternshipList from "../Components/InternshipList";
import ButtonLog from "../Components/ButtonLog";
import { auth, googleProvider } from "../config/firebase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { signOut, } from "firebase/auth";


const Main = () => {
  const [internships, setInternships] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to check user is logged in or not.

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
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  return (
    <div className="container p-6 mx-auto ">
      <Toaster></Toaster>
      <div className="px-2 py-3 rounded-[25px] shadow-md bg-blue-500 flex gap-5 justify-center items-center">
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
        <div>
          {isLoggedIn ? (
            <ButtonLog text='Logout' onClick={() => signOut(auth)}></ButtonLog>
          ) : (
            <ButtonLog text='Login'/>
          )}
        </div>
      </div>

      <div className="mt-8">
        <InternshipList internships={internships} />
      </div>
    </div>
  );
};
export default Main;
