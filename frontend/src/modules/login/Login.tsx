import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useUser } from "../../context/userContext";

interface LoginProps {
  switchToRegister: () => void;
  closeModal: () => void;
}

const Login: React.FC<LoginProps> = ({ switchToRegister, closeModal }) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const { setUser } = useUser();

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[a-z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;

    if (strength <= 2) return "Weak";
    else if (strength === 3 || strength === 4) return "Medium";
    else return "Strong";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(checkPasswordStrength(newPassword));
  };

  const loginUser = async () => {
    const payload = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
        payload,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser({
          name: response.data.user?.name,
          email: response.data.user?.email,
        });
        closeModal();
        setEmail("");
        setPassword("");
        setPasswordStrength("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <div className="text-4xl font-bold text-center">
        <span className="text-green-500">thakur</span>cart
        <span className="text-green-500">.</span>
      </div>

      <h2 className="text-center font-bold text-2xl mb-10 mt-4">Sign In</h2>

      <div className="relative mb-4">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="peer block w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 focus:outline-none"
        />
        <label className="absolute left-2 top-1 text-gray-500 text-xs transition-all">
          Email
        </label>
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          className="peer block w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 focus:outline-none"
        />
        <label className="absolute left-2 top-1 text-gray-500 text-xs transition-all">
          Password
        </label>
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? (
            <VscEye className="cursor-pointer" size={20} />
          ) : (
            <VscEyeClosed className="cursor-pointer" size={20} />
          )}
        </button>
      </div>
      {password && (
        <div className="text-sm mt-1">
          <span
            className={`font-semibold ${
              passwordStrength === "Weak"
                ? "text-red-500"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            Strength: {passwordStrength}
          </span>
          <div className="h-1 w-full bg-gray-200 mt-1 rounded">
            <div
              className={`h-1 rounded transition-all duration-300 ${
                passwordStrength === "Weak"
                  ? "w-1/4 bg-red-500"
                  : passwordStrength === "Medium"
                  ? "w-2/4 bg-yellow-500"
                  : "w-full bg-green-500"
              }`}
            ></div>
          </div>
        </div>
      )}
      <button
        onClick={loginUser}
        className="w-full  mt-5 bg-gray-900 text-white p-3 rounded-md cursor-pointer"
      >
        Sign In
      </button>
      <p className="text-center mt-3 text-sm text-gray-400">
        Don't have an account?{" "}
        <span
          onClick={switchToRegister}
          className="text-blue-600 cursor-pointer"
        >
          Sign Up
        </span>
      </p>

      <div className=" flex items-center justify-center mt-2">
        <div className="border w-30 mr-4 text-gray-400"></div>
        <div>or</div>
        <div className="ml-4 border w-30 text-gray-400"></div>
      </div>

      <button className="w-full flex justify-center items-center gap-4 mt-5 shadow-md p-3 rounded-md cursor-pointer">
        <FcGoogle size={20} /> Sign In with Google
      </button>

      <p className="text-center mt-5 text-sm text-gray-400">
        By signing in to existing account I accept Company's{" "}
        <span className="text-blue-600">Terms of Use and Privacy Policy</span>
      </p>
    </div>
  );
};

export default Login;
