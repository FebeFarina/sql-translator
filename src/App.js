import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainPage from "./pages/MainPage";
import ConnectionForm from "./pages/ConnectionForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectionForm />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
