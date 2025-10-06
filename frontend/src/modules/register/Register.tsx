import React, { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface RegisterProps {
  switchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ switchToLogin }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState("");

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

  return (
    <div className="p-8">
      <div className="text-4xl font-bold text-center">
        <span className="text-green-500">thakur</span>cart
        <span className="text-green-500">.</span>
      </div>

      <h2 className="text-center font-bold text-2xl mb-10 mt-4">Sign Up</h2>

      <div className="relative mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="peer block w-full border border-gray-300 rounded-md px-3 pt-5 pb-2 text-sm text-gray-900 focus:outline-none"
        />
        <label className="absolute left-2 top-1 text-gray-500 text-xs transition-all">
          Name
        </label>
      </div>

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
          {showPassword ? <VscEye size={20} /> : <VscEyeClosed size={20} />}
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
    </div>
  );
};

export default Register;
