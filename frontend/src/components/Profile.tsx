import { useEffect, useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Modal from "./Modal";
import Login from "../modules/login/Login";
import Register from "../modules/register/Register";
import { useUser } from "../context/userContext";

const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"login" | "register">("register");
  const [showProfileBox, setShowProfileBox] = useState(false); 

  const { user, setUser } = useUser();
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "";

  const profileRef = useRef<HTMLDivElement>(null);

  const openModal = (type: "login" | "register") => {
    setModalType(type);
    setIsOpen(true);
  };

  const handleProfileClick = () => {
    if (user) {
      setShowProfileBox((prev) => !prev);
    } else {
      openModal("login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfileBox(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setUser(null);
    setShowProfileBox(false);
  };

  return (
    <div className="relative" ref={profileRef}>
      {user ? (
        <div
          className="h-8 w-8 cursor-pointer rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-semibold"
          onClick={handleProfileClick}
        >
          {userInitial}
        </div>
      ) : (
        <CgProfile
          className="h-8 w-8 cursor-pointer text-gray-700 hover:text-gray-900"
          onClick={handleProfileClick}
        />
      )}

      {showProfileBox && user && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg p-3 z-50">
          <div className="flex flex-col">
            <span className="font-semibold text-gray-800">{user.name}</span>
            <span className="text-sm text-gray-500">{user.email}</span>
          </div>
          <hr className="my-2" />
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 text-sm font-medium text-left w-full"
          >
            Logout
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalType === "login" && (
          <Login
            closeModal={() => setIsOpen(false)}
            switchToRegister={() => setModalType("register")}
          />
        )}
        {modalType === "register" && (
          <Register switchToLogin={() => setModalType("login")} />
        )}
      </Modal>
    </div>
  );
};

export default Profile;
