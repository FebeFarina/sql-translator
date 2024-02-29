import React, {useState} from "react";

const ConnectionForm = () => {
    return (
      <div className="bg-slate-700 flex flex-col justify-center items-center h-screen">
        <h1 className="text-4xl text-white font-bold mb-4">SQL Generator</h1>
        <form className="max-w-sm mx-auto p-10">
            <div className="mb-5">
            <label for="database" className="block text-white mb-2">Database type</label>
            <select className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" name="database" id="database">
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
                <input type="text" id="host" name="host" className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"/>
            </div>
            <div className="mb-5">
                <label for="port" className="block text-white mb-2">Port</label>
                <input type="text" id="port" name="port" className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"/>
            </div>
            <div className="mb-5">
                <label for="username" className="block text-white mb-2">Username</label>
                <input type="text" id="username" name="username" className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"/>
            </div>
            <div className="mb-5">
                <label for="password" className="block text-white mb-2">Password</label>
                <input type="password" id="password" name="password" className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"/>
            </div>
            <div className="mb-5">
                <label for="database" className="block text-white mb-2">Database name</label>
                <input type="text" id="database" name="database" className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"/>
            </div>
            <div className="mb-5">
                <label for="schema" className="block text-white mb-2">Schema</label>
                <input type="text" id="schema" name="schema" className=" h-7 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"/> 
            </div>
            <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Connect</button>
        </form>
      </div>
    );
};

export default ConnectionForm;