import React, { createContext, useState } from "react";

export type UserContextProps = {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextProps | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  const contextValue: UserContextProps = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
