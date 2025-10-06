import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Modal from "./Modal";
import Login from "../modules/login/Login";
import Register from "../modules/register/Register";

const Profile: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"login" | "register">("register");

  const openModal = (type: "login" | "register") => {
    setModalType(type);
    setIsOpen(true);
  };

  const switchToLogin = () => setModalType("login");
  const switchToRegister = () => setModalType("register");

  return (
    <div>
      <CgProfile
        className="h-8 w-8 cursor-pointer text-gray-700 hover:text-gray-900"
        onClick={() => openModal("register")}
      />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {modalType === "login" && <Login switchToLogin={switchToLogin} />}
        {modalType === "register" && <Register switchToRegister={switchToRegister} />}
      </Modal>
    </div>
  );
};

export default Profile;
