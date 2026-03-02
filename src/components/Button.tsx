import "./Button.css";

type ButtonProps = {
  disabled?: boolean;
  buttonName: string;
  // position: string;
  size?: "small" | "large";
  type?: "submit" | "button";
  onClick?: () => void;
};

export default function Button({
  onClick,
  size,
  buttonName,
  disabled,
  type = "button",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`button ${size}`}
      disabled={disabled}
      type={type}
    >
      {buttonName}
    </button>
  );
}
