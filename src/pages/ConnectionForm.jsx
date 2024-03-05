import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseContext } from '../DatabaseContext'; 

const ConnectionForm = () => {
    
    const { databaseInfo, setDatabaseInfo } = useContext(DatabaseContext);
    const [databaseType, setDatabaseType] = useState("mysql");
    const [port, setPort] = useState(3306);
    const [host, setHost] = useState("localhost");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [database, setDatabase] = useState("");
    const [schema, setSchema] = useState("public");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

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

      const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

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
            setDatabaseInfo({
                databaseType,
                host,
                port,
                username,
                password,
                database,
                schema,
              });
          navigate("/main")
        } else {
            alert('Error');
        }
        setIsLoading(false);
      };

    if (isLoading) {
        return (
          <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        );
    }

    return (
      <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
        <form className="max-w-sm mx-auto p-10" onSubmit={handleSubmit}>
            <div className="mb-5">
            <label for="database" className="block text-white mb-2">Database type</label>
            <select className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" 
                    name="database" 
                    id="database" 
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
                       className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3"/>
            </div>
            <div className="mb-5">
                <label for="port" className="block text-white mb-2">Port</label>
                <input type="number" 
                       id="port" 
                       name="port" 
                       value={port} 
                       onChange={(e) => setPort(e.target.value)} 
                       className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3"/>
            </div>
            <div className="mb-5">
                <label for="username" className="block text-white mb-2">Username</label>
                <input type="text" 
                       id="username" 
                       name="username" 
                       value={username} 
                       onChange={(e) => setUsername(e.target.value)}
                       className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3"/>
            </div>
            <div className="mb-5">
                <label for="password" className="block text-white mb-2">Password</label>
                <input type="password" 
                       id="password" 
                       name="password" 
                       value={password} 
                       onChange={(e) => setPassword(e.target.value)}
                       className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3"/>
            </div>
            <div className="mb-5">
                <label for="database" className="block text-white mb-2">Database name</label>
                <input type="text" 
                       id="database" 
                       name="database" 
                       value={database} 
                       onChange={(e) => setDatabase(e.target.value)}
                       className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3"/>
            </div>
            <div className="mb-5">
                <label for="schema" className="block text-white mb-2">Schema</label>
                <input type="text"
                       id="schema" 
                       name="schema" 
                       value={schema} 
                       onChange={(e) => setSchema(e.target.value)}
                       className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400 w-50 p-3"/> 
            </div>
            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Connect</button>
        </form>
      </div>
    );
};

export default ConnectionForm;