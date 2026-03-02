import React from "react";
import "./Cards.css";
import "./App.tsx";
import "./App.tsx";
import QuizInput from "../components/QuizInput.tsx";
import "./Quiz-page.css";
import Header from "../components/Header";
import MoodCard from "../components/Card";
import Button from "../components/Button";

export default function QuizPage() {
  type Question = {
    text: string;
    options: {
      key: number;
      text: string;
      score: number;
    }[];
  };

  /*const questions2 = {
    q1: {
      text: "daf",
      options: {
        o1: {
          text: "ssf",
          value: 1
        }
      }
    }
  }*/

  const questions: Question[] = [
    {
      text: "How are you feeling right now?",
      options: [
        { key: 1, text: "Good, full of energy", score: 1 },
        { key: 2, text: "Neutral", score: 2 },
        { key: 3, text: "Tired or low", score: 3 },
        { key: 4, text: "Exhausted or unwell", score: 4 },
      ],
    },
    {
      text: "Which option best describes your mood today?",
      options: [
        { key: 11, text: "Happy or inspired", score: 1 },
        { key: 12, text: "Calm", score: 2 },
        { key: 13, text: "Anxious or sad", score: 3 },
        { key: 14, text: "Very distressed or overwhelmed", score: 4 },
      ],
    },
    {
      text: "What is your energy level today?",
      options: [
        { key: 21, text: "High", score: 1 },
        { key: 22, text: "Medium", score: 2 },
        { key: 23, text: "Low", score: 3 },
        { key: 24, text: "Very low or drained", score: 4 },
      ],
    },
    {
      text: "How do you react to things around you right now?",
      options: [
        { key: 31, text: "Positively", score: 1 },
        { key: 32, text: "Neutrally", score: 2 },
        { key: 33, text: "Irritated", score: 3 },
        { key: 34, text: "Highly reactive or overwhelmed", score: 4 },
      ],
    },
  ];

  const [result, setResult] = React.useState(0);
  const [activeQuestion, setActiveQuestion] = React.useState(0); // (0)

  // stale closure?
  const handleClick = React.useCallback(
    (score: number) => {
      setActiveQuestion(activeQuestion + 1);
      setResult(result + score);
    },
    [activeQuestion],
  );

  const question = questions[activeQuestion];
  // useCallback
  /* function handleClick(score: number) {
    const index = questions.findIndex(
      (question) => question.id === activeQuestion,
    ); 
    setActiveQuestion(activeQuestion + 1);

    setResult(result + score);

    console.log("score", setResult);

    console.log("index:", setActiveQuestion);

    /* setResult((prev) => prev + values)

    console.log("result:", totalResult); 
    */

  /* const isLast = index === questions.length - 1;
    if (!isLast) {
      setActiveQuestion(questions[index + 1].id);
    } else {
    }*/

  /* console.log("isLast:", isLast);

    const points = Number(e.currentTarget.value);
    setResult((prev) => prev + points);
    console.log("points (number):", points);
    setFinished((prev) => ({ ...prev, [activeQuestion]: true })); */

  /*if (points <= 10) {
      alert("You're doing okay");
    } else {
      alert("You need help");
    }
      */

  return (
    <div className="quiz-wrapper">
      <Header color="yellow"></Header>

      <div>
        {activeQuestion < questions.length ? (
          <div>
            <h3 className="question-text">{question.text}</h3>
            {question.options.map((opt) => (
              <QuizInput
                key={opt.key}
                selected={false}
                text={opt.text}
                value={opt.score}
                onChange={() => {
                  handleClick(Number(opt.score));
                }}
              />
            ))}
          </div>
        ) : (
          <div>
            Result: {result}
            <MoodCard size="large"></MoodCard>
          </div>
        )}
      </div>
    </div>
  );
}
