import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
import List from "./pages/list/List.jsx";
import Hotel from "./pages/hotel/Hotel.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Apartment from "./pages/apartment/Apartment.jsx";
import Villa from "./pages/villa/Villa.jsx";
import Resort from "./pages/resort/Resort.jsx";
import CabinArc from "./pages/cabinArc/CabinArc.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/apartments/:id" element={<Apartment />} />
        <Route path="/cabins/:id" element={<CabinArc />} />
        <Route path="/villas/:id" element={<Villa />} />
        <Route path="/resorts/:id" element={<Resort />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
