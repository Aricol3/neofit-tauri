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
import DietOverview from "./screens/DietOverview.tsx";
import Authentication from "./screens/Authentication.tsx";
import SetUserProfile from "./screens/SetUserProfile.tsx";

function Layout({ children }: PropsWithChildren) {
  const location = useLocation();
  console.log("LOCATION", location);

  const routesWithHeader = ["/", "/nutrition", "/profile", "/create-food", "/add-food", "/diet-overview"];
  const routesWithPrefixHeader = ["/edit-food"];
  const routesWithSearchHeader = ["/search"];

  const isInRouteList = (routeList: string[]) =>
    routeList.includes(location.pathname) ||
    routeList.some(route => location.pathname.startsWith(route + "/"));

  const needsPadding = isInRouteList(routesWithHeader) || isInRouteList(routesWithPrefixHeader);
  const needsSearchHeaderPadding = isInRouteList(routesWithSearchHeader);

  const hideNavbarRoutes = ["/auth", "/set-profile", "/scan"];

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
        <Route path="/auth" element={<Authentication />} />
        <Route path="/set-profile" element={<SetUserProfile />} />
        <Route path="/scan" element={<Scanner />} />
        <Route path="/nutrition" element={<Nutrition />} />
        <Route path="/add-food" element={<AddFood />} />
        <Route path="/search" element={<Search />} />
        <Route path="/edit-food/:entryId" element={<EditFood />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-food" element={<CreateFood />} />
        <Route path="/diet-overview" element={<DietOverview />} />
      </Routes>
    </Layout>
  );
}
