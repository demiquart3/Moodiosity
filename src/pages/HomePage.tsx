import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Button from "../components/Button";
import Header from "../components/Header";
import "./Diary.css";

export default function HomePage() {
  const navigate = useNavigate();

  function handleNext() {
    navigate("/app");
  }

  return (
    <div className="display">
      <Header color="yellow"></Header>
      <div className="greeting-text">
        <h2>Discover yourself, improve your mood and life</h2>
        <p>
          This app will help you to better understand your current condition and
          give you good tips on how to deal with some conditions or how to
          improve or support already good one.{" "}
        </p>

        <Button size="large" buttonName="let's go" onClick={handleNext} />
      </div>
      <div className="picture-container"></div>
    </div>
  );
}
