'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Create the context with a default value of undefined
const GlobalContext = createContext<any | undefined>(undefined);

interface GlobalContextProviderProps {
  children: ReactNode;
}

// Custom hook for initializing state with local storage
const useLocalStorageState = (key: string, defaultValue: any) => {
  const [state, setState] = useState(() => {
    if (typeof window === 'undefined') return defaultValue;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state]);

  return [state, setState];
};

// Provider component
export const GlobalContextProvider = ({ children }: GlobalContextProviderProps) => {
  const [user, setUser] = useLocalStorageState("user", {
    name: "",
    email: "",
    mobile: "",
    address: "",
    is_active: true,
    fee_paid: false
  });

  const [userList, setUserList] = useLocalStorageState("userList", []);
  const [auth, setAuth] = useLocalStorageState("auth", false);
  const [status, setStatus] = useLocalStorageState("status", true);
  const [flag, setFlag] = useLocalStorageState("flag", false);

  const contextValue = { userList, setUserList, user, setUser, auth, setAuth, status, setStatus, flag, setFlag };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = (): any => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
