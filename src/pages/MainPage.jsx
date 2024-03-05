import React, {useState, useContext} from "react";
import ResultBox from "../components/ResultBox";
import QueryBox from "../components/QueryBox";
import {DatabaseContext} from "../DatabaseContext"

const MainPage = () => {
    const { databaseInfo } = useContext(DatabaseContext);
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();

      if (!databaseInfo.databaseType) {
        alert("Please connect to a database first");
        return;
      }
  
      async function fetchQuery() {
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
        const data = await response.text();
        setResult(data.output);
      }
  
      setIsLoading(true);
      fetchQuery();
      setIsLoading(false);
    };

    if (isLoading) {
      return (
        <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
          <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
          <QueryBox query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
          <p className="text-white text-2xl">Loading...</p>
        </div>
      );
    }
  
    return (
      <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
        <QueryBox query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
        <ResultBox result={result} isLoading={isLoading} />
      </div>
    );
}

export default MainPage