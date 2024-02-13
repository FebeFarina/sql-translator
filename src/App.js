import React, {useState, useEffect} from "react";
import {SqlDatabase} from "langchain/sql_db";
import {DataSource} from "typeorm";

function App() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    const initialize = async () => {
      const datasource = new DataSource({
        type: "postgres",
        database: "../moviesdb",
      });
      const db = await SqlDatabase.fromDataSourceParams({
        appDataSource: datasource,
      });
      console.log(db.allTables.map((table) => table.tableName));
    };

    initialize();
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setResult(query);
  };

  return (
    <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
      <form className="w-1/2" onSubmit={handleSubmit}>
        <div className="w-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="query" className="sr-only">
              Escriba su petición
            </label>
            <textarea
              id="query"
              rows="4"
              className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
              placeholder="Escriba su petición"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Generar SQL
            </button>
          </div>
        </div>
      </form>
      <div className="w-1/2 px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
        <textarea
          className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 resize-none"
          readOnly
          placeholder="Your SQL will appear here"
          value={result}></textarea>
      </div>
    </div>
  );
}

export default App;
