import React from "react";
import Test from "./pages/Test";
import Busca from "./pages/Busca"; // Importe o componente Busca corretamente
import Result from "./pages/Result"; // Importe o componente Result corretamente
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Busca />} />
        <Route path="/result" element={<Result />} />
        <Route path="/test" element={<Test/>} />
      </Routes>
    </div>
  );
}

export default App;