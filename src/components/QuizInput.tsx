import "./QuizInput.css";

type QuizProps = {
  name: string;
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
  name,
}: QuizProps) {
  return (
    <div
      className={`quiz-selection-container ${selected ? "is-selected" : ""}`}
    >
      <label className="quiz-question">
        {text}
        <input
          name={name}
          type="radio"
          className="quiz-selection"
          checked={selected}
          value={Number(value)}
          onChange={onChange}
        ></input>
      </label>
    </div>
  );
}
