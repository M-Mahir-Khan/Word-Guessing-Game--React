import React, { useState, useEffect } from "react";
import WordGuess from "./components/WordGuess";
import "./App.css";

const App = () => {
  const words = [
    { word: "apple", hint: "A sweet red or green fruit." },
    { word: "banana", hint: "A long yellow fruit." },
    { word: "elephant", hint: "The largest land animal." },
    { word: "ocean", hint: "A large body of saltwater." },
    { word: "guitar", hint: "A musical instrument with strings." },
    { word: "sunflower", hint: "A tall plant with a large yellow flower." },
    { word: "python", hint: "A popular programming language or a snake." },
    { word: "chocolate", hint: "A sweet made from cacao beans." },
    { word: "telescope", hint: "An instrument used to observe distant objects." },
    { word: "pyramid", hint: "An ancient Egyptian structure." },
    { word: "calendar", hint: "Used to track dates and months." },
    { word: "umbrella", hint: "Used to protect against rain or sun." },
    { word: "computer", hint: "An electronic machine for processing data." },
    { word: "butterfly", hint: "An insect with colorful wings." },
    { word: "diamond", hint: "A precious shiny gemstone." },
    { word: "volcano", hint: "A mountain that can erupt with lava." },
    { word: "piano", hint: "A large musical instrument with keys." },
    { word: "planet", hint: "A celestial body that orbits the sun." },
    { word: "library", hint: "A place full of books for reading." },
    { word: "rainbow", hint: "It appears after rain with multiple colors." }
  ];
  

  const [difficulty, setDifficulty] = useState("Medium");
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);

  const [currentWordData, setCurrentWordData] = useState(
    words[Math.floor(Math.random() * words.length)]
  );
  const [hiddenWord, setHiddenWord] = useState("_".repeat(currentWordData.word.length));
  const [attempts, setAttempts] = useState(getAttemptsByDifficulty());
  const [guessedLetters, setGuessedLetters] = useState([]);

  // Difficulty attempts
  function getAttemptsByDifficulty() {
    if (difficulty === "Easy") return Infinity;
    if (difficulty === "Hard") return 3;
    return 6; // Medium
  }

  // Handle user guess
  const handleGuess = (letter) => {
    if (guessedLetters.includes(letter) || attempts <= 0) return;

    const updatedLetters = [...guessedLetters, letter];
    setGuessedLetters(updatedLetters);

    if (currentWordData.word.includes(letter)) {
      let updatedHiddenWord = "";
      for (let i = 0; i < currentWordData.word.length; i++) {
        updatedHiddenWord += updatedLetters.includes(currentWordData.word[i])
          ? currentWordData.word[i]
          : "_";
      }
      setHiddenWord(updatedHiddenWord);
      if (!updatedHiddenWord.includes("_")) {
        setScore(score + 10); // Add points
        nextWord();
      }
    } else {
      setAttempts(attempts - 1);
    }
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    if (timeLeft === 0) nextWord();
    return () => clearInterval(timer);
  }, [timeLeft]);

  const nextWord = () => {
    const newWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWordData(newWord);
    setHiddenWord("_".repeat(newWord.word.length));
    setAttempts(getAttemptsByDifficulty());
    setGuessedLetters([]);
    setTimeLeft(30);
  };

  const resetGame = () => {
    setScore(0);
    nextWord();
  };

  return (
    <div className="app">
      <h1>Word Guessing Game</h1>
      {/* <p>Difficulty: {difficulty}</p> */}
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>
      <WordGuess
        hiddenWord={hiddenWord}
        attempts={attempts}
        guessedLetters={guessedLetters}
        hint={currentWordData.hint}
        onGuess={handleGuess}
        onReset={resetGame}
      />
      {/* <div className="difficulty">
        <button onClick={() => setDifficulty("Easy")}>Easy</button>
        <button onClick={() => setDifficulty("Medium")}>Medium</button>
        <button onClick={() => setDifficulty("Hard")}>Hard</button>
      </div> */}
    </div>
  );
};

export default App;
