import React, {useState, useContext} from "react";
import ResultBox from "../components/ResultBox";
import QueryBox from "../components/QueryBox";
import {DatabaseContext} from "../DatabaseContext"

const MainPage = () => {
    const { databaseInfo } = useContext(DatabaseContext);
    const [query, setQuery] = useState("");
    const [answer, setAnswer] = useState("");
    const [sqlQuery, setSqlQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();

      if (!databaseInfo.databaseType) {
        alert("Please connect to a database first");
        return;
      }
  
      async function fetchQuery() {
        setIsLoading(true);
        const response = await fetch("http://localhost:3001", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            query,
            databaseInfo,
           }),
        });
        const data = await response.json();
        setAnswer(data.answer);
        setSqlQuery(data.sqlQuery);
        setIsLoading(false);
      }

      fetchQuery();
      
    };

    return (
      <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
        {isLoading ? (
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        ) : (
          <QueryBox query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
        )}
        <ResultBox resultType="el resultado de la petición" result={answer} isLoading={isLoading} />
        <ResultBox resultType="la consulta SQL empleada" result={sqlQuery} isLoading={isLoading}/>
      </div>
    );
}

export default MainPage