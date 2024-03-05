import React, {createContext, useState} from "react";

export const DatabaseContext = createContext();

export const DatabaseProvider = ({children}) => {
  const [databaseInfo, setDatabaseInfo] = useState({
    databaseType: "",
    host: "",
    port: "",
    username: "",
    password: "",
    database: "",
    schema: "",
  });

  return (
    <DatabaseContext.Provider value={{databaseInfo, setDatabaseInfo}}>
      {children}
    </DatabaseContext.Provider>
  );
};
