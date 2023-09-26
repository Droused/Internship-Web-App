import { useEffect, useState } from "react";
import ButtonLog from "../Components/ButtonLog";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <div className="fixed top-0 left-0 z-50 w-64 h-full overflow-y-auto transition-all duration-300 ease-in-out bg-gray-200 sm:hidden">
      {" "}
      {isLoggedIn ? (
        <ButtonLog text="Logout" onClick={() => signOut(auth)}></ButtonLog>
      ) : (
        <ButtonLog text="Login" />
      )}
    </div>
  );
};
export default Sidebar;
