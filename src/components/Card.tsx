import "./Card.css";

type CardProps = {
  selected?: boolean;
  className?: string;
  mood: "angry" | "sad" | "happy" | "bored";
  size?: "small" | "large";
  onClick: () => void;
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

export default function MoodCard({ mood, onClick, size = "large" }: CardProps) {
  const img = cardImages[mood];
  const txt = cardText[mood];
  return (
    <div
      onClick={onClick}
      style={{ backgroundImage: `url(${img})` }}
      className={`card ${mood} ${size}`}
    ></div>
  );
}
