import React, {useState} from "react";
import ResultBox from "../components/ResultBox";
import QueryBox from "../components/QueryBox";

const MainPage = () => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      async function fetchQuery() {
        const response = await fetch("http://localhost:3001", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: query,
        });
        const data = await response.text();
        setResult(data);
      }
  
      setIsLoading(true);
      fetchQuery();
      setIsLoading(false);
    };
  
    return (
      <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
        <QueryBox query={query} setQuery={setQuery} handleSubmit={handleSubmit} />
        <ResultBox result={result} isLoading={isLoading} />
      </div>
    );
}

export default MainPage