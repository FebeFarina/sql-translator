import React, { useState, useEffect } from 'react';


function App() {

  const [customPrompt, setCustomPrompt] = useState("")
  const [queryList, setQueryList] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [sqlQuerys, setSqlQuerys] = useState([]);
  const [query, setQuery] = useState();
  const [connectionStatus, setConnectionStatus] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [databaseType, setDatabaseType] = useState("mysql");
  const [port, setPort] = useState(3306);
  const [host, setHost] = useState("localhost");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [database, setDatabase] = useState("");
  const [schema, setSchema] = useState("public");

  useEffect(() => {
    switch (databaseType) {
      case "mysql":
      case "mariadb":
        setPort(3306);
        break;
      case "postgres":
        setPort(5432);
        break;
      case "oracle":
        setPort(1521);
        break;
      case "mssql":
        setPort(1433);
        break;
      case "mongodb":
        setPort(27017);
        break;
      case "sqlite":
        setPort(8191);
        break;
      default:
        setPort("");
    }
  }, [databaseType]);

  const clearChat = () => {
    setAnswers([]);
    setSqlQuerys([]);
  }

  const testConnection = async () => {
    const response = await fetch('http://localhost:3001/ping', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        databaseType,
        host,
        port,
        username,
        password,
        database,
        schema,
      }),
    });

    if (response.ok) {
      const connectionData = {
        databaseType,
        host,
        port,
        username,
        password,
        database,
        schema,
      };
      setConnectionStatus(true);
      return connectionData;
    }
    setConnectionStatus(false);
    return false;
  };

  const handleQuerySubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const connection = await testConnection();
    console.log(connection ? "Connection OK" : "Connection failed")
    if (!connection) {
      setIsLoading(false);
      return;
    }
    const response = await fetch("http://localhost:3001", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        databaseInfo: connection,
        query,
        customPrompt,

      }),
    });
    const data = await response.json();
    setAnswers(answers.concat(data.answer));
    setSqlQuerys(sqlQuerys.concat(data.sqlQuery));
    setQueryList(queryList.concat(query));
    setQuery("");
    setIsLoading(false);
  };

  return (
    <div className="h-screen overflow-hidden flex z-0 relative">
      <div className="w-1/5 bg-slate-950">
        <div className="flex flex-col h-full min-h-0">
          <h1 className="text-2xl text-white px-7 py-5">SQL Translator</h1>
          <form className="max-w-sm mx-auto p-5">
            <div className="mb-5">
              <label for="database" className="block text-white mb-2">Database type</label>
              <select className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                name="databaseType"
                id="databaseType"
                value={databaseType}
                onChange={(e) => setDatabaseType(e.target.value)}>
                <option value="mysql">MySQL</option>
                <option value="postgres">PostgreSQL</option>
                <option value="sqlite"> SQLite</option>
                <option value="oracle">Oracle</option>
                <option value="mssql">MS SQL Server</option>
                <option value="mongodb">MongoDB</option>
                <option value="mariadb">MariaDB</option>
              </select>
            </div>
            <div className="mb-5">
              <label for="host" className="block text-white mb-2 ">Host</label>
              <input type="text"
                id="host"
                name="host"
                value={host}
                onChange={e => setHost(e.target.value)}
                className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3" />
            </div>
            <div className="mb-5">
              <label for="port" className="block text-white mb-2">Port</label>
              <input type="number"
                id="port"
                name="port"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3" />
            </div>
            <div className="mb-5">
              <label for="username" className="block text-white mb-2">Username</label>
              <input type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3" />
            </div>
            <div className="mb-5">
              <label for="password" className="block text-white mb-2">Password</label>
              <input type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3" />
            </div>
            <div className="mb-5">
              <label for="database" className="block text-white mb-2">Database name</label>
              <input type="text"
                id="database"
                name="database"
                value={database}
                onChange={(e) => setDatabase(e.target.value)}
                className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3" />
            </div>
            <div className="mb-5">
              <label for="schema" className="block text-white mb-2">Schema</label>
              <input type="text"
                id="schema"
                name="schema"
                value={schema}
                onChange={(e) => setSchema(e.target.value)}
                className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3" />
            </div>
          </form>

          {connectionStatus ? (
            <div className="p-5">
              <h2 className="text-center text-green-600">Connection OK</h2>
            </div>
          ) : connectionStatus === false ? (
            <div className="p-5">
              <h2 className="text-center text-red-600">Connection failed</h2>
            </div>
          ) : <div className="p-5">
            <h2 className="text-center text-yellow-600"> Please, enter connection info before making the question </h2>
          </div>}

          <button className={answers.length > 0 ? "w-full bg-red-500 text-white py-2" : "w-full bg-red-500 text-white py-2 opacity-50 cursor-not-allowed"} type="button"
            onClick={clearChat}>Clear Chat</button>
        </div>
      </div>
      <div className="w-4/5 relative flex max-w-full flex-1 flex-col overflow-hidden bg-slate-700">
        <main className='relative flex-1 overflow-auto transition-width'>
          <form className="m-10" onSubmit={handleQuerySubmit}>
            <div className="w-auto mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
              <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                <label htmlFor="query" className="sr-only">
                  Type your question
                </label>
                <textarea
                  id="query"
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 resize-none"
                  placeholder="Type your question"
                  required
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}></textarea>
              </div>
              <div className="px-4 py-2 bg-white border-t dark:border-gray-600 border-gray-200 dark:bg-gray-800">
                <label htmlFor="query" className="sr-only">
                  Type your question
                </label>
                <textarea
                  id="query"
                  rows="4"
                  className="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 resize-none"
                  placeholder="Add a custom prompt: e.g. 'Give me the answer in Spanish.'"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}></textarea>
              </div>
              <div className="flex items-center justify-start px-3 py-2 border-t dark:border-gray-600">
                <button
                  type="submit"
                  className="inline-flex items-center py-2.5 px-4 mr-5 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                  Generate SQL
                </button>
                <button
                  type="submit"
                  onClick={(e) => { e.preventDefault(); setQuery("Tell me all you know about the database"); handleQuerySubmit(e) }}
                  className="inline-flex items-center py-2.5 px-4 mr-5 text-xs font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
                  Sample Quesiton
                </button>
              </div>

            </div>
          </form>
          <div className="p-5">
            {isLoading ? (
              <div className="text-center">
                <p className="text-white">Loading...</p>
              </div>
            ) : (
              <div className="flex flex-col">
                {[...answers].reverse().map((answer, index) => (
                  <div key={index} className="mb-5 flex justify-between">
                    <div className="flex-1 ml-2 bg-slate-800 rounded border-gray-200 dark:border-gray-600">
                      <h2 className="text-white m-2">Query</h2>
                      <p className="text-white m-2">{queryList[queryList.length - 1 - index]}</p>
                    </div>
                    <div className="flex-1 mx-2 bg-slate-800 rounded border-gray-200 dark:border-gray-600">
                      <h2 className="text-white m-2">Answer</h2>
                      <p className="text-white m-2">{answer}</p>
                    </div>
                    <div className="flex-1 ml-2 bg-slate-800 rounded border-gray-200 dark:border-gray-600">
                      <h2 className="text-white m-2">SQL Query</h2>
                      <p className="text-white m-2">{sqlQuerys[sqlQuerys.length - 1 - index]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div >
    </div >
  );
}

export default App;
