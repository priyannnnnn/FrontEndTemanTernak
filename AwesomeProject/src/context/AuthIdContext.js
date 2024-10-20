import React, { createContext, useState } from 'react';

export const DataUserContext = createContext();

export const DataUserProvider = ({ children }) => {
  const [dataArray, setDataArray] = useState([]);

  return (
    <DataUserContext.Provider value={{ dataArray, setDataArray }}>
      {children}
    </DataUserContext.Provider>
  );
};