"use client";

import { createContext, ReactNode, useContext, useState } from "react";

const SharedStateContext = createContext<any>(null);

export const SharedStateProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState(false);

  return (
    <SharedStateContext.Provider value={{ userData, setUserData }}>
      {children}
    </SharedStateContext.Provider>
  );
};

export function usedSharedState() {
  return useContext(SharedStateContext);
}
