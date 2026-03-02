import "./Header.css";

type HeaderProps = {
  className?: string;
  color?: "green" | "yellow" | "peach";
};

export default function Header({ className, color }: HeaderProps) {
  return (
    <div className={`main-header ${color} ${className ?? ""}`}>
      <a className="header-links" href="/">
        Home
      </a>
      <a className="header-links" href="/cards">
        Moodiosity
      </a>
      <a className="header-links" href="/quiz">
        Test
      </a>
      <a className="header-links" href="/diary">
        Diary
      </a>
    </div>
  );
}
