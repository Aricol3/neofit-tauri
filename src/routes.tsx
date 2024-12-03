import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home.tsx";
import Scanner from "./screens/Scanner.tsx";
import Nutrition from "./screens/Nutrition.tsx";
import AddFood from "./components/AddFood.tsx";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scan" element={<Scanner />} />
      <Route path="/nutrition" element={<Nutrition />} />
      <Route path="/add-food" element={<AddFood />} />
    </Routes>
  );
}
