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
import Profile from "./screens/Profile.tsx";

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  console.log("LOCATION", location);

  const routesWithHeader = ["/", "/nutrition", "/profile", "/create-food", "/add-food", "/edit-food"];
  const routesWithSearchHeader = ["/search"];

  const needsPadding = routesWithHeader.some(route => location.pathname.startsWith(route));
  const needsSearchHeaderPadding = routesWithSearchHeader.some(route => location.pathname.startsWith(route));

  const hideNavbarRoutes = ["/scan"];

  return (
    <div className="pb-28" style={{ paddingTop: needsPadding ? "4rem" : needsSearchHeaderPadding ? "10rem" : "0" }}>
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
        <Route path="/search" element={<Search />} />
        <Route path="/edit-food/:entryId" element={<EditFood />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-food" element={<CreateFood />} />
      </Routes>
    </Layout>
  );
}
