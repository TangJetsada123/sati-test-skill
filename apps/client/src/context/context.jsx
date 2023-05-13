import { createContext, useState,useContext } from 'react';

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [myData, setMyData] = useState(null);

  return (
    <MyContext.Provider value={{ myData, setMyData }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
