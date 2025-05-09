import { createContext, useContext } from "react"
import { useAuth as useAuthProvider } from "../hooks/useAuth"

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe utilizarse dentro de AuthProvider")
  }
  return context
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider()

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};