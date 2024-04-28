import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./pages/home.jsx";
import { Flashcards } from "./pages/flashcards.jsx";

export function AppRouter({}) {
  // logika funcke

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/flashcards" element={<Flashcards />} />
      </Routes>
    </Router>
  );
}
