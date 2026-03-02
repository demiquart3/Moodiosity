import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Button from "../components/Button";
import Header from "../components/Header";

function App() {
  const [name, setName] = React.useState("");
  const [dark, setDark] = React.useState(false);
  const [inputValid, setInputValid] = React.useState<string | undefined>(
    undefined,
  ); // inputValid
  const [characterCounter, setCharacterCounter] = React.useState(0);

  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.setItem("name", name);
  }, [name]);

  // useCallback, currying? advanced technique of working with functions
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.value;
      setName(name);
      setCharacterCounter(e.target.value.length);
      if (name.length > 15) {
        setInputValid("The name is too long!");
      } else if (!name) {
        setInputValid("Enter your name!");
        return;
      } else if (name.length <= 1) {
        setInputValid("The name is too short!");
        return;
      } else if (name === "") {
        setInputValid("Enter your name!");
      } else if (name.trim() !== "" && Number.isFinite(Number(name.trim()))) {
        setInputValid("Your name must have letters!");
        return;
      } else {
        setInputValid(undefined);
      }
    },
    [],
  );

  const handleSubmit = React.useCallback(() => {
    navigate("/cards");
  }, [navigate]);

  return (
    <div id="display" className={dark ? "dark" : ""}>
      <Header color="peach"></Header>
      <div id="InputContainer" className={dark ? "dark" : ""}>
        <h1>Hi {name || "stranger"}! What&apos;s your name?</h1>

        <form className="inputForm" onSubmit={handleSubmit}>
          <div id="NameInputContainer">
            <input
              id="NameInput"
              className={inputValid ? "error" : "noerror"}
              placeholder="Enter your name"
              value={name}
              onChange={handleChange}
            />
            <p id="Counter">{characterCounter}/15</p>
          </div>
          <div className="formBottomContainer">
            <p id="InputParagraph" className={inputValid ? "error" : "noerror"}>
              {inputValid}
            </p>
            <div className="submitButtonWrapper">
              <Button
                size="large"
                type="submit"
                disabled={Boolean(inputValid)}
                buttonName={`Let's go, ${name || "stranger"}!`}
              />
            </div>
          </div>
        </form>
        <div className="modeButtonWrapper">
          <Button
            size="small"
            onClick={() => setDark((prev) => !prev)}
            buttonName="Switch Modes"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
