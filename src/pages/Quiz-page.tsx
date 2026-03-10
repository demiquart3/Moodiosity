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

  const name = localStorage.getItem("name") ?? "stranger";

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

  const [activeQuestion, setActiveQuestion] = React.useState(0);

  // i created an array for answers. the array is empty with 4 empty "boxes" for each answer(score)
  // every answer = one score. a box has only one cell for every chosen option. click = one cell is filled.
  // useMemo is a React Hook that lets you cache the result of a calculation
  // between re-renders. const cachedValue = useMemo(calculateValue, dependencies)
  const [answers, setAnswers] = React.useState<number[]>([]);    // created an empty array

  // error text
  const [inputValid, setInputValid] = React.useState<string | undefined>(
    undefined,
  );

  // i put a score in answers[activeQuestion]
  const handleSelect = React.useCallback(
    (score: number) => {
      setAnswers((prev) => {
        const next = [...prev];
        next[activeQuestion] = score; // if nothing is here, new element will be created
        return next;
      });
      setInputValid(undefined);
    },
    [activeQuestion],
  );

  console.log("active", activeQuestion);
  // next button: checking if the next question is chosen
  const handleClick = React.useCallback(() => {
    if (answers[activeQuestion] == null) {
      // i check if there's a number in answers. if not, then error
      setInputValid("Choose an option!");
      return;
    }
    setActiveQuestion(activeQuestion + 1); // if everything's okay = next
  }, [answers, activeQuestion]);

  const handlePrevious = React.useCallback(() => {
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  }, [activeQuestion]);

  const question = questions[activeQuestion];

  // calculating answers that react memorized in the new array (answers)
  const total = React.useMemo(
    () => answers.reduce((sum, v) => sum + (v ?? 0), 0),
    [answers],
  );

  console.log("answer", answers);

  // querySelector
  return (
    <div className="quiz-wrapper">
      <Header color="yellow"></Header>

      <div>
        {activeQuestion < questions.length ? (
          <div>
            <h3 className="question-text">
              {" "}
              {name}
              {question.text}
            </h3>
            {question.options.map((opt) => (
              <QuizInput
                name={`question_${activeQuestion + 1}`}
                key={opt.key}
                selected={answers[activeQuestion] === opt.score} // option highlight
                text={opt.text}
                value={opt.score}
                onChange={() => {
                  handleSelect(Number(opt.score)); // put it in answers
                }}
              />
            ))}
            <div className="ButtonsWrapper">
              <div className="previousButton">
                <Button
                  size="large"
                  disabled={answers[activeQuestion] == null}
                  onClick={handlePrevious}
                  buttonName="previous"
                ></Button>
              </div>
              <div className="nextButton">
                <Button
                  size="large"
                  disabled={answers[activeQuestion] == null} // blocking next if the option is not chosen
                  onClick={handleClick} // if yes go next
                  buttonName="next"
                ></Button>
              </div>
            </div>
            <p>{inputValid}</p>
          </div>
        ) : (
          <div className="resultPage">
            Result:
            {total}
            {total <= 4 ? (
              <MoodCard size="large" mood="happy"></MoodCard>
            ) : total <= 8 ? (
              <MoodCard size="large" mood="bored"></MoodCard>
            ) : total <= 12 ? (
              <MoodCard size="large" mood="sad"></MoodCard>
            ) : (
              <MoodCard size="large" mood="angry"></MoodCard>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
``;
