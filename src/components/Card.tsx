import "./Card.css";
import * as React from "react";

type CardProps = {
  selected?: boolean;
  className?: string;
  mood: "angry" | "sad" | "happy" | "bored";
  size?: "small" | "large";
  onClick?: () => void;
};

const cardImages = {
  sad: "/src/images/sad.png",
  bored: "/src/images/bored.jpg",
  happy: "/src/images/happy.jpg",
  angry: "/src/images/angry.jpg",
};

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

export default function MoodCard({ mood, onClick, size }: CardProps) {
  const img = cardImages[mood];

  const [isOpen, setIsOpen] = React.useState(false);

  function handleClick() {
    setIsOpen((prev) => !prev);
    if (onClick) {
      onClick();
    }
  }

  return (
    <div>
      <div
        onClick={handleClick}
        style={{ backgroundImage: `url(${img})` }}
        className={`card ${mood} ${size}`}
      />

      {isOpen && <section className="textBox">{cardText[mood]}</section>}
    </div>
  );
}
``;
