import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const initialTHeme =
    window.matchMedia("(prefers-color-scheme: dark)").matches || false;
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    initialTHeme,
    "isDarkMode"
  );

  function toggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error(
      "useDarkModeContext must be used within a DarkModeProvider"
    );
  }
  return context;
};

export default DarkModeProvider;
