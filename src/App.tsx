import React from "react";
import Busca from "./pages/Busca";
import { Routes, Route } from "react-router-dom";

function App() {
  return(
    <div className="App">
      <Routes>
        <Route path="/" element={<Busca/>} />
      </Routes>
    </div>
  );
}

export default App;