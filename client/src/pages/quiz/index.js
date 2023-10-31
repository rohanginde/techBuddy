import { useState, useEffect } from 'react';

// Define the quiz data
const quizData = {
  questions: [
    {
      id: 1,
      text: 'What is the capital of France?',
      options: ['Paris', 'London', 'Madrid', 'Berlin'],
      answer: 'Paris'
    },
    // more questions here...
  ]
};

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // Define the timer logic
    if (timeRemaining > 0 && currentQuestion < quizData.questions.length) {
      setTimer(setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000));
    } else {
      clearInterval(timer); // Clear the timer when time reaches 0 or quiz is complete
    }

    // Clean up the timer when the component unmounts
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timeRemaining, currentQuestion]);

  const handleOptionSelect = event => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const currentAnswer = quizData.questions[currentQuestion].answer;
    if (selectedOption === currentAnswer) {
      setScore(prevScore => prevScore + 1);
    }
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
    setSelectedOption('');
  };

  return (
    <div>
      <h1>Quiz</h1>
      <p>Time remaining: {timeRemaining} seconds</p>
      {currentQuestion < quizData.questions.length ? (
        <div>
          <p>Question {currentQuestion + 1}:</p>
          <p>{quizData.questions[currentQuestion].text}</p>
          <form onSubmit={handleSubmit}>
            {quizData.questions[currentQuestion].options.map(option => (
              <label key={option}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionSelect}
                />
                {option}
              </label>
            ))}
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      ) : (
        <div>
          <p>Quiz complete!</p>
          <p>Your score: {score}</p>
        </div>
      )}
    </div>
  );
}
