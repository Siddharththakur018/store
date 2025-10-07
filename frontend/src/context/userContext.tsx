import {
  createContext,
  useState,
  useContext,
  type ReactNode,
  useEffect,
} from "react";

type User = { name: string } | null;

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
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, {
          credentials: "include", 
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    fetchUser();
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
