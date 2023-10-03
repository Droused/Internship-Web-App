import { useEffect, useState } from "react";
import InternshipList from "../Components/InternshipList";
import ButtonLog from "../Components/ButtonLog";
import { auth, googleProvider } from "../config/firebase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import Dropdown from "../Components/Dropdown";
import SearchBar from "../Components/Searchbar";

export const Main = () => {
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
    const serverEndpoint =
      "https://proxy.jasanpreetn9.workers.dev/?https://internship-web-app-oeft-ahlruf3qr-droused.vercel.app/simplifyjobs";

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
    <div className="container p-2 mx-auto sm:p-4 md:p-6">
      <Toaster />
      <div className="flex flex-col items-center justify-center gap-3 p-4 mb-4 bg-blue-500 rounded-lg shadow-md sm:flex-row sm:gap-5">
        <h1 className="hidden mb-2 text-2xl font-bold text-center text-white sm:text-3xl md:text-4xl sm:mb-0 sm:ml-20 sm:block">
          InternshipsForYou
        </h1>
        <div className="flex justify-center w-full pt-2 sm:pt-0">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isLoggedIn ? (
          <Dropdown
            isLoggedIn={isLoggedIn}
            onLogout={() => signOut(auth)}
            className="w-full mt-2 sm:w-auto sm:mt-0"
          />
        ) : (
          <ButtonLog className="w-full mt-2 sm:w-auto sm:mt-0">Login</ButtonLog>
        )}
      </div>

      <div className="relative mt-4">
        <div className="flex items-center justify-center px-4 mb-4 space-x-2 sm:justify-between sm:px-0 sm:space-x-0">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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
