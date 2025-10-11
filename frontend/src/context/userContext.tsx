import { createContext, useState, useContext, type ReactNode, useEffect } from "react";
import axios from "axios";

type User = { name: string; email: string } | null;

interface useContextType {
  user: User;
  setUser: (user: User) => void;
}

const userContext = createContext<useContextType | undefined>(undefined);

interface userProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<userProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
        withCredentials: true, // <-- send cookies
      })
      .then((res) => {
        setUser(res.data.user || null);
      })
      .catch((err) => {
        console.error(err);
        setUser(null);
      });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(userContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
