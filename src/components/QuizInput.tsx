import "./QuizInput.css";

type QuizProps = {
  text: string;
  selected?: boolean;
  className?: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function QuizInput({
  text,
  selected,
  value,
  onChange,
}: QuizProps) {
  return (
    <div className="quiz-selection-container">
      <input
        type="radio"
        className={`quiz-selection ${selected ? "is-selected" : ""}`}
        checked={selected}
        value={Number(value)}
        onChange={onChange}
      ></input>
      <label className="quiz-question">{text}</label>
    </div>
  );
}
