import React from "react";
import { useTheme, useUpdateTheme } from "./ThemeContext";

export default function FunctionContext() {
  const darkTheme = useTheme();
  const toggleTheme = useUpdateTheme();
  const themeStyles = {
    backgroundColor: darkTheme ? "#333" : "#CCC",
    color: darkTheme ? "#CCC" : "#333",
    padding: "20px",
    maxWidth: "300px",
  };
  return (
    <>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div style={themeStyles}>FunctionContext</div>
    </>
  );
}
