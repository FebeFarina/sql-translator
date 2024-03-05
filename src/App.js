import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ConnectionForm from "./pages/ConnectionForm";
import {DatabaseProvider} from "./DatabaseContext"; // Asegúrate de usar la ruta correcta a tu archivo DatabaseContext

function App() {
  return (
    <DatabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ConnectionForm />} />
          <Route path="/main" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </DatabaseProvider>
  );
}

export default App;
