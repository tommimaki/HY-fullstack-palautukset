import { useState } from "react";

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
);
const StatLine = ({ prefix, value }) => {
  if (!value) {
    return;
  }

  return (
    <tr>
      <td>{prefix}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = ((good - bad) / total)?.toFixed(2);
  const positivePercentage = Math.round((good / total) * 100);

  if (total === 0) {
    return <p>No feedback yet</p>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Statistics</th>
          </tr>
        </thead>
        <tbody>
          <StatLine prefix="Good" value={good} />
          <StatLine prefix="Neutral" value={neutral} />
          <StatLine prefix="Bad" value={bad} />
          <StatLine prefix="Overall" value={total} />
          <StatLine prefix="Average" value={average} />
          <StatLine prefix="positive %: " value={positivePercentage} />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(null);
  const [neutral, setNeutral] = useState(null);
  const [bad, setBad] = useState(null);
  const setToValue = (func, value) => func(value);
  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="Good" clickHandler={() => setToValue(setGood, good + 1)} />
      <Button
        text="Neutral"
        clickHandler={() => setToValue(setNeutral, neutral + 1)}
      />
      <Button text="Bad" clickHandler={() => setToValue(setBad, bad + 1)} />
      <br />
      {"good: "}
      {good}
      <br />
      {"neutral: "}
      {neutral}
      <br />

      {"bad: "}
      {bad}
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
