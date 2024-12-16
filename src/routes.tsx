import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home.tsx";
import Scanner from "./screens/Scanner.tsx";
import Nutrition from "./screens/Nutrition.tsx";
import AddFood from "./screens/AddFood.tsx";
import EditFood from "./screens/EditFood.tsx";
import CreateFood from "./screens/CreateFood.tsx";
import { PropsWithChildren } from "react";
import Search from "./screens/Search.tsx";

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();

  const routesWithHeader = ["/search", "/profile"];
  const needsPadding = routesWithHeader.includes(location.pathname);

  return (
    <div style={{ paddingTop: needsPadding ? "3rem" : "0" }}>
      {children}
    </div>
  );
}

export default function MainRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/search" element={<AddFood />} />
        <Route path="/edit-food" element={<EditFood />} />
        <Route path="/profile" element={<Search />} />
      </Routes>
    </Layout>
  );
}
