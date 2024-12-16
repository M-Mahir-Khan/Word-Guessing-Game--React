import React, { useState } from "react";

const WordGuess = ({
  hiddenWord,
  attempts,
  guessedLetters,
  hint,
  onGuess,
  onReset,
}) => {
  const [letter, setLetter] = useState("");

  const handleInput = (e) => {
    setLetter(e.target.value.toUpperCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (letter.match(/[A-Z]/) && letter.length === 1) {
      onGuess(letter);
    }
    setLetter("");
  };

  return (
    <div className="word-guess">
      <h2>Word: {hiddenWord.split("").join(" ")}</h2>
      <p>Hint: {hint}</p>
      <p>Attempts Left: {attempts}</p>
      <p>Guessed Letters: {guessedLetters.join(", ") || "None"}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          maxLength="1"
          value={letter}
          onChange={handleInput}
          placeholder="Enter a letter"
        />
        <button type="submit">Guess</button>
      </form>
      {attempts === 0 && <h3>Game Over! The word was: {hiddenWord}</h3>}
      {!hiddenWord.includes("_") && <h3>You Won! 🎉</h3>}
      <button onClick={onReset} className="reset-btn">
        Play Again
      </button>
    </div>
  );
};

export default WordGuess;
