import { useEffect, useState } from "react";
import InternshipList from "../Components/InternshipList";
import ButtonLog from "../Components/ButtonLog";
import { auth, googleProvider } from "../config/firebase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import Dropdown from "../Components/Dropdown";

const Main = () => {
  const [internships, setInternships] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInternships = internships.filter((internship) => {
    const companyMatch =
      typeof internship.company === "string"
        ? internship.company.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
    const dateMatch =
      typeof internship.company === "string"
        ? internship.datePosted.toLowerCase().includes(searchTerm.toLowerCase())
        : false;

    const locationMatch = internship.jobLocation.some((location) =>
      location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return locationMatch || companyMatch || dateMatch;
  });

  const totalPages = Math.ceil(filteredInternships.length / itemsPerPage);
  const currentItems = filteredInternships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const logoutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
        toast.error("Please log in!");
        window.location.href = "/login";
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container p-2 mx-auto sm:p-4 md:p-6">
      <Toaster></Toaster>
      <div className="px-2 py-3 rounded-[25px] shadow-md bg-blue-500 flex flex-col sm:flex-row gap-5 justify-center items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white ml-0 sm:ml-[80px]">
          InternshipsForYou
        </h1>
        <div className="flex justify-center w-full p-0 m-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-[40px] sm:h-[50px] md:h-[60px] p-2 transition duration-300 border rounded-[15px] shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/2 xl:w-[500px] focus:outline-none focus:border-slate-600 focus:ring focus:ring-slate-200 focus:ring-opacity-50"
            placeholder="Search Company, Location, Date..."
          />
        </div>
        <Dropdown isLoggedIn={isLoggedIn} onLogout={() => signOut(auth)}></Dropdown>
      </div>

      <div className="relative mt-4">
        <div className="absolute top-2 right-1 sm:top-[10px] sm:right-6 flex space-x-1 sm:space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-gray-200 rounded"
          >
            Previous
          </button>
          <span className="self-center text-xs sm:text-sm">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-1 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm bg-gray-200 rounded"
          >
            Next
          </button>
        </div>

        <InternshipList internships={currentItems} />
      </div>
    </div>
  );
};
export default Main;
