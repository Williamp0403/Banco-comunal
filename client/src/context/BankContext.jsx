import { createContext, useContext } from "react"
import { useBank as useBankProvider } from "../hooks/useBank"

export const BankContext = createContext()

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error("useBank debe utilizarse dentro de BankProvider")
  }
  return context
}

export const BankProvider = ({ children }) => {
  const bank = useBankProvider()

  return (
    <BankContext.Provider value={bank}>
      {children}
    </BankContext.Provider>
  );
};