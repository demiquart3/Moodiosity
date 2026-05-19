import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/app";
import Cards from "./pages/cards";
import "./index.css";
import QuizPage from "./pages/quiz-page";
import HomePage from "./pages/home-page";
import Diary from "./pages/diary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<App />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/diary" element={<Diary />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
