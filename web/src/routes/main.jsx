import { useEffect, useState } from "react";
import InternshipList from "../Components/InternshipList";
import ButtonLog from "../Components/ButtonLog";
import { auth, googleProvider } from "../config/firebase.js";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";
import Dropdown from "../Components/Dropdown";
import SearchBar from "../Components/Searchbar";
import ContactUs from "../Components/EmailSender";

export const Main = () => {
  const [internships, setInternships] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [todaysInternships, setTodaysInternships] = useState([]);

  const SERVER_ENDPOINT =
    "https://proxy.jasanpreetn9.workers.dev/?https://internship-web-app-oeft-ahlruf3qr-droused.vercel.app/simplifyjobs";

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
    const today = new Date();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedDate = `${monthNames[today.getMonth()]} ${today
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    // Assuming internship is an array of objects with date properties
    const todaysItems = internships.filter(
      (item) => item.datePosted === formattedDate
    );
    if (todaysItems.length > 0) {
      setTodaysInternships((prevInternships) => {
        // Check if the items are already in the state to avoid duplicates
        const newInternships = todaysItems.filter(
          (item) => !prevInternships.some((prevItem) => prevItem.id === item.id)
        );
        return [...prevInternships, ...newInternships];
      });
    }
  }, [internships]);

  useEffect(() => {
  }, [todaysInternships]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast.success("Logged in as " + user.email);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container relative p-4 mx-auto md:p-6">
      <Toaster />

      <div className="flex items-center justify-between p-6 rounded-lg shadow-lg bg-gradient-to-r from-blue-600 to-blue-900">
        <div className="flex flex-col items-center space-x-6">
          <h1 className="text-3xl font-bold text-white">InternshipsForYou</h1>
          <p className="text-sm text-gray-300">Software Engineering Internships Made For You</p>
        </div>

        <div className="absolute">
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search internships, companies, locations..."
          />
        </div>

        <div className="space-x-4">
          {isLoggedIn ? (
            <Dropdown isLoggedIn={isLoggedIn} onLogout={() => signOut(auth)} />
          ) : (
            <ButtonLog className="px-4 py-2 text-white transition bg-transparent border border-white rounded-full hover:bg-white hover:text-blue-900">
              Login
            </ButtonLog>
          )}
        </div>
      </div>

      <div className="mt-6">
        <InternshipList internships={currentItems} />
        <div className="flex justify-end gap-5 mx-10 mt-4 z-100">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
      <ContactUs message={todaysInternships}></ContactUs>
    </div>
  );
};
export default Main;
