import { useNavigate } from "react-router-dom";
import * as React from "react";
import "./Cards.css";
import "./App.tsx";
import MoodCard from "../components/Card";
import Button from "../components/Button";

export default function Gallery() {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") ?? "stranger";
  // const cardSelected = localStorage.getItem("selected") ??

  // localStorage.set('selected', JSON.parse(selected));

  //JSON.parse("")

  // one value from localStorage
  const [selected, setSelected] = React.useState({
    sad: false,
    bored: false,
    happy: false,
    angry: false,
  });

  function handleGoBack() {
    navigate("/");
  }

  function handleQuizPage() {
    navigate("/quiz");
  }

  const cards: ("sad" | "bored" | "happy" | "angry")[] = [
    "sad",
    "bored",
    "happy",
    "angry",
  ];

  const cardText = {
    sad: `😢 You are sad, which means… 
    …you feel down and heavy inside right now.
    You may feel lonely, miss someone, or feel upset because something didn’t happen the way you expected.
    Sometimes sadness comes without a clear reason — simply because you are tired.
    In this state, you may:

- want to be alone, or on the contrary, want someone to be close;
- feel like listening to sad music or watching calm, emotional movies;
- have less energy and motivation;
- think more about the past.

Sadness is a normal emotion. It helps you understand that something important matters to you and that you may need care, comfort, or rest.`,
    bored: "bored",
    happy: "happy",
    angry: "angry",
  };

  React.useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  const isCardSelected = cards.some((card) => selected[card]);

  return (
    <div id="Display">
      <h2 id="GalleryTitle">Choose your mood, {name}</h2>
      <section id="GalleryRow">
        {cards.map((card) =>
          !isCardSelected || selected[card] ? (
            <MoodCard
              mood={card}
              key={card}
              selected={selected[card]}
              size="large"
              onClick={() =>
                setSelected((prevSelected) => ({
                  ...prevSelected,
                  [card]: !prevSelected[card as keyof typeof prevSelected],
                }))
              }
            />
          ) : undefined,
        )}

        <section className="textBox">
          {Object.entries(cardText).map(
            (
              [key, value], // Object.keys, Object.value
            ) =>
              isCardSelected && selected[key as keyof typeof selected] ? (
                <div>{value}</div>
              ) : undefined,
          )}
        </section>
        <section className="takeATestSection">
          <p className="takeATestParagraph">
            or you can take a test to determine your mood
          </p>
          <div className="takeATestButtonWrapper">
            <div className="quizButtonWrapper">
              <Button
                size="small"
                onClick={handleQuizPage}
                buttonName="Take Quiz"
              />
            </div>
          </div>
        </section>
      </section>
      <div className="goBackButtonWrapper">
        <Button size="small" onClick={handleGoBack} buttonName="Go Back" />
      </div>
    </div>
  );
}
