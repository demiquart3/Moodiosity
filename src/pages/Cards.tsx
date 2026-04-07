import { useNavigate } from "react-router-dom";
import * as React from "react";
import "./Cards.css";
import "./App.tsx";
import MoodCard from "../components/Card";
import Button from "../components/Button";
import Header from "../components/Header";

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

  React.useEffect(() => {
    localStorage.setItem("selected", JSON.stringify(selected));
  }, [selected]);

  const isCardSelected = cards.some((card) => selected[card]);

  return (
    <div id="Display">
      <Header></Header>
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

        <section className="takeATestSection">
          <p className="takeATestParagraph">
            or you can take a test to determine your mood
          </p>
          <div className="buttonsWrapper">
            <div className="takeATestButtonWrapper">
              <div className="quizButtonWrapper">
                <Button
                  size="small"
                  onClick={handleQuizPage}
                  buttonName="Take A Test"
                />
                <div className="goBackButtonWrapper">
                  <Button
                    size="small"
                    onClick={handleGoBack}
                    buttonName="Go Back"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
