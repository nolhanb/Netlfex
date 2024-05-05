import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/styles.css";
import Détails from "./pages/FilmsDetails";
import Home from "./pages/Home";
import { useEffect } from "react";
import Entrance from "./composant/Movie"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Détails />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/a" element={<Entrance />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
