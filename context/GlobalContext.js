import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [yearValue, setYearValue] = useState(5);
  const [age, setAge] = useState("");
  const [selectedSubstance, setSelectedSubstance] = useState(null);
  const [selectedDependency, setSelectedDependency] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        yearValue,
        setYearValue,
        age,
        setAge,
        selectedSubstance,
        setSelectedSubstance,
        selectedDependency,
        setSelectedDependency,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
