import * as React from "react";
import "./Cards.css";
import Header from "../components/Header";
import Button from "../components/Button";
import { useState, useEffect } from "react";

export default function Diary() {
  const questions = [
    "What did you feel today?",
    "What did you do today?",
    "What made you feel better today?",
  ];

  const [activeQuestion, setActiveQuestion] = React.useState(0);
  const [answer, setAnswer] = React.useState("");
  const [answers, setAnswers] = React.useState<string[]>([]);
  const [diary, setDiary] = React.useState<string[][]>([]);
  const [date, setDate] = React.useState("");
  const [logDate, setLogDate] = React.useState<string[]>([]);

  localStorage.setItem("logDate", JSON.stringify(logDate));
  localStorage.setItem("answers", JSON.stringify(answers));

  function nextQuestion() {
    if (!answer.trim()) return;
    setAnswers((prev) => [...prev, answer]);
    setAnswer("");
    setActiveQuestion(activeQuestion + 1);
  }

  function saveDiary() {
    if (answers.length === 0) return;
    setDiary((prev) => [...prev, answers]);
    setAnswers([]);
    setAnswer("");
    setActiveQuestion(0);
    setDate("");
    setLogDate((prev) => [...prev, date]);
  }

  function deleteDiary() {
    setDiary([]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (activeQuestion < questions.length) {
      nextQuestion();
      return;
    }
    saveDiary();
  }

  const isFinished = activeQuestion >= questions.length;

  return (
    <div className="diary">
      <Header />

      <div className="diary-grid">
        <h2 className="title">Welcome to your Diary</h2>

        <label htmlFor="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <p className="subtitle">
          Here you can answer a few questions and save your thoughts.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          {!isFinished ? (
            <>
              <p className="question">{questions[activeQuestion]}</p>

              <input
                type="text"
                className="input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write a short note…"
              />

              <div className="actions">
                <Button size="large" buttonName="Next" type="submit" />
              </div>
            </>
          ) : (
            <div className="actions">
              <Button size="large" buttonName="Save" type="submit" />
            </div>
          )}
        </form>

        <div className="diary-list">
          {diary.map((entry, i) => (
            <div key={i} className="diary-entry">
              {logDate}
              {entry.map((text, j) => (
                <p key={j}>* {text}</p>
              ))}
            </div>
          ))}
        </div>

        {diary.length > 0 && (
          <div className="actions">
            <Button
              size="large"
              buttonName="Delete all"
              onClick={deleteDiary}
            />
          </div>
        )}
      </div>
    </div>
  );
}
``;
