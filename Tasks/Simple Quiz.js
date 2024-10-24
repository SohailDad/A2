import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

const quizQuestions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Rome", "Berlin"],
    correctAnswer: "Paris"
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    correctAnswer: "Harper Lee"
  },
  {
    question: "What is the smallest prime number?",
    options: ["1", "2", "3", "5"],
    correctAnswer: "2"
  },
  {
    question: "What is the speed of light?",
    options: ["299,792 km/s", "150,000 km/s", "100,000 km/s", "1,000,000 km/s"],
    correctAnswer: "299,792 km/s"
  }
];

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(10); // 10 seconds per question
  const [timeOver, setTimeOver] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setTimeOver(true);
    }
  }, [timer]);

  const handleAnswerOptionClick = (option) => {
    if (option === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
      setTimer(10); // reset timer
      setTimeOver(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowScore(false);
    setTimer(10);
    setTimeOver(false);
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Your Score: {score} / {quizQuestions.length}</Text>
          {quizQuestions.map((q, index) => (
            <Text key={index} style={styles.answer}>
              {q.question} - Correct answer: {q.correctAnswer}
            </Text>
          ))}
          <Button title="Restart Quiz" onPress={resetQuiz} />
        </View>
      ) : (
        <View>
          <Text style={styles.questionText}>
            {quizQuestions[currentQuestionIndex].question}
          </Text>

          <View>
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswerOptionClick(option)}
                disabled={timeOver}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.timerText}>Time Left: {timer}s</Text>
          {timeOver && <Text style={styles.timeOverText}>Time is up!</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 8,
    width: 300,
    alignItems: 'center',
    borderRadius: 8,
  },
  optionText: {
    fontSize: 18,
  },
  timerText: {
    fontSize: 18,
    marginTop: 20,
  },
  timeOverText: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 30,
    marginBottom: 20,
  },
  answer: {
    fontSize: 18,
    marginBottom: 5,
  },
});
