import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./screens/Home.tsx";
import Scanner from "./screens/Scanner.tsx";
import Nutrition from "./screens/Nutrition.tsx";
import AddFood from "./screens/AddFood.tsx";
import EditFood from "./screens/EditFood.tsx";
import CreateFood from "./screens/CreateFood.tsx";
import React, { PropsWithChildren } from "react";
import Search from "./screens/Search.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();

  const routesWithHeader = [""];
  const routesWithDayHeader = ["/nutrition", "/search", "/profile", "/create-food","/add-food"];
  const needsPadding = routesWithHeader.includes(location.pathname);
  const needsDayHeaderPadding = routesWithDayHeader.includes(location.pathname);

  const hideNavbarRoutes = ["/scan"];

  return (
    <div className="pb-28" style={{ paddingTop: needsPadding ? "3rem" : needsDayHeaderPadding ? "4rem" : "0" }}>
      {children}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
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
        <Route path="/add-food" element={<AddFood />} />
        <Route path="/search" element={<AddFood />} />
        <Route path="/edit-food" element={<EditFood />} />
        <Route path="/profile" element={<CreateFood />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </Layout>
  );
}
