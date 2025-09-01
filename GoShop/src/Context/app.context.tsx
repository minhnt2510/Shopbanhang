import { createContext, useState } from "react";
import { getAccessTokenFromLS } from "../utils/auth";
import type { ExtendedPurchase } from "../Types/purchase.type";

interface AppContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  extendedPurchases: ExtendedPurchase[];
  setExtendedPurchases: React.Dispatch<
    React.SetStateAction<ExtendedPurchase[]>
  >;
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  extendedPurchases: [],
  setExtendedPurchases: () => null,
};

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  );
  const [extendedPurchases, setExtendedPurchases] = useState<
    ExtendedPurchase[]
  >(initialAppContext.extendedPurchases);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        extendedPurchases,
        setExtendedPurchases,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
