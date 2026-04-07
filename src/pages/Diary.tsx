import * as React from "react";
import "./Cards.css";
import Header from "../components/Header";
import Button from "../components/Button";

export default function Diary() {
  const questions = [
    "What did you feel today?",
    "What did you do today?",
    "What made you feel better today?",
  ];

  const [activeQuestion, setActiveQuestion] = React.useState(0);
  const [answer, setAnswer] = React.useState("");

  const [answers, setAnswers] = React.useState<string[]>([]);

  const [diary, setDiary] = React.useState<string[][]>([]);
  const [logDate, setLogDate] = React.useState<string[]>([]);
  const [date, setDate] = React.useState("");

  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState<string[]>([]);

  React.useEffect(() => {
    localStorage.setItem("diary", JSON.stringify(diary));
    localStorage.setItem("logDate", JSON.stringify(logDate));
  }, [diary, logDate]);

  React.useEffect(() => {
    const savedDiary = localStorage.getItem("diary");
    const savedLogDate = localStorage.getItem("logDate");

    if (savedDiary) {
      setDiary(JSON.parse(savedDiary));
    }

    if (savedLogDate) {
      setLogDate(JSON.parse(savedLogDate));
    }
  }, []);

  const nextQuestion = React.useCallback(() => {
    if (!answer.trim()) return;

    setAnswers([...answers, answer]);
    setAnswer("");
    setActiveQuestion(activeQuestion + 1);
  }, [answer, answers, activeQuestion]);

  const saveDiary = React.useCallback(() => {
    if (answers.length === 0) return;
    if (!date) return;

    const selectedDate = new Date(date);
    let day = selectedDate.getDate();
    let month = selectedDate.getMonth() + 1;
    let year = selectedDate.getFullYear();

    let selectedDateStr = `${day}-${month}-${year}`;

    const today = new Date();
    let todayStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    if (selectedDateStr !== todayStr) {
      alert("Please choose today's date.");
      return;
    }

    if (date !== today.toISOString().split("T")[0]) {
      alert("Please choose today's date.");
      return;
    }

    setDiary([...diary, answers]);
    setLogDate([...logDate, selectedDateStr]);
    setDate("");
    setAnswers([]);
    setAnswer("");
    setActiveQuestion(0);
  }, [answers, date, diary, logDate]);

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setDraft([...diary[index]]);
  };

  const handleDraftChange = (lineIndex: number, value: string) => {
    setDraft((prev) => {
      const copy = [...prev];
      copy[lineIndex] = value;
      return copy;
    });
  };

  const handleSave = () => {
    if (editingIndex === null) return;

    setDiary((prev) => {
      const copy = [...prev];
      copy[editingIndex] = [...draft];
      return copy;
    });

    setEditingIndex(null);
    setDraft([]);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setDraft([]);
  };
  ``;

  const deleteDiary = React.useCallback(() => {
    setDiary([]);
    setLogDate([]);
    localStorage.removeItem("diary");
    localStorage.removeItem("logDate");
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (activeQuestion < questions.length) {
      nextQuestion();
      return;
    }

    saveDiary();
  }

  const isFinished = activeQuestion >= questions.length;

  return (
    <div className="diary">
      <Header />

      <div className="diary-grid">
        <h2 className="title">Welcome to your Diary</h2>

        <label htmlFor="start">Start date:</label>
        <input
          type="date"
          id="start"
          name="trip-start"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <p className="subtitle">
          Here you can answer a few questions and save your thoughts.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          {!isFinished ? (
            <>
              <p className="question">{questions[activeQuestion]}</p>

              <input
                type="text"
                className="input"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write a short note…"
              />

              <div className="actions">
                <Button size="large" buttonName="Next" type="submit" />
              </div>
            </>
          ) : (
            <div className="actions">
              <Button size="large" buttonName="Save" type="submit" />
            </div>
          )}
        </form>

        <div className="diary-list">
          {diary.map((entry, i) => (
            <div key={i} className="diary-entry">
              <strong>{logDate[i]}</strong>

              {editingIndex === i ? (
                <>
                  {draft.map((text, j) => (
                    <input
                      key={j}
                      value={text}
                      onChange={(e) => handleDraftChange(j, e.target.value)}
                    />
                  ))}

                  <Button
                    buttonName="save"
                    size="small"
                    onClick={handleSave}
                  ></Button>
                  <Button
                    buttonName="cancel"
                    size="small"
                    onClick={handleCancel}
                  ></Button>
                </>
              ) : (
                <>
                  <Button
                    buttonName="change"
                    size="small"
                    onClick={() => handleEditStart(i)}
                  ></Button>

                  {entry.map((text, j) => (
                    <p key={j}>{text}</p>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
        {diary.length > 0 && (
          <div className="actions">
            <Button
              size="large"
              buttonName="Delete all"
              onClick={deleteDiary}
            />
          </div>
        )}
      </div>
    </div>
  );
}
