import { createContext, useState,useContext ,useEffect} from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';



export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [myData, setMyData] = useState(null);
  const [token,setToken] = useState(null)

  return (
    <MyContext.Provider value={{ myData, setMyData,token,setToken}}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);
