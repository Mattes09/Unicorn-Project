import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import FlashcardsPage from "./pages/FlashcardsPage.jsx";
import ActivitiesPage from "./pages/ActivitiesPage.jsx";
import PairsPage from "./pages/PairsPage.jsx";
import JumbledLettersPage from "./pages/JumbledLettersPage.jsx";
import MultipleChoicePage from "./pages/MultipleChoicePage.jsx";
import TestPage from "./pages/TestPage.jsx";

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/flashcards" element={<FlashcardsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/pairs" element={<PairsPage />} />
        <Route path="/jumbled-letters" element={<JumbledLettersPage />} />
        <Route path="/multiple-choice" element={<MultipleChoicePage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </Router>
  );
}
