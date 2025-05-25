import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import LeagueTeams from "./pages/LeagueTeams";
import LeagueMatches from "./pages/LeagueMatches";
import LeagueInfo from "./pages/LeagueInfo";
import "./App.css";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <h1>⚽ كورة اليوم</h1>
        <div className="nav-links">
          <NavLink 
            to="/league-teams" 
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            الفرق
          </NavLink>
          <NavLink 
            to="/league-matches" 
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            المباريات
          </NavLink>
          <NavLink 
            to="/league-info" 
            className={({ isActive }) => (isActive ? "active-link" : undefined)}
          >
            معلومات الدوري
          </NavLink>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/league-teams" element={<LeagueTeams />} />
          <Route path="/league-matches" element={<LeagueMatches />} />
          <Route path="/league-info" element={<LeagueInfo />} />
          <Route path="*" element={<div>اختر صفحة من الرابط (مثلاً /league-teams)</div>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
