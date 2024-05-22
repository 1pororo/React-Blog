import React from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  return <AuthContext>{children}</AuthContext>;
}
