import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { FaBolt, FaBrain, FaDeskpro, FaRobot, FaTimes, FaTruckLoading } from "react-icons/fa";

const QuizTester = () => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]); // ✅ for checkboxes
    const [isFinished, setIsFinished] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [open, setOpen] = useState(false);

  // Fetch quiz questions
    const fetchQuestions = () => {
        fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
        .then((res) => res.json())
        .then((data) => {
            const formatted = data.results.map((q) => {
            const options = [...q.incorrect_answers, q.correct_answer].sort(
                () => Math.random() - 0.5
            );

            return {
                question: q.question,
                options,
                answer: q.correct_answer,
                explanation: `The correct answer is "${q.correct_answer}" because this is how it's defined in computer science / programming context.`,
            };
            });

            setQuestions(formatted);
            setCurrentIndex(0);
            setAnswers([]);
            setIsFinished(false);
            setShowConfetti(false);
            setSelectedOptions([]); // reset
        });
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

  // Handle checkbox toggle
    const toggleOption = (option) => {
        if (selectedOptions.includes(option)) {
            setSelectedOptions(selectedOptions.filter((o) => o !== option));
        } else {
            setSelectedOptions([...selectedOptions, option]);
        }
    };

  // Submit current question
    const handleSubmitAnswer = () => {
        if (selectedOptions.length === 0) return; // must choose something

        const isCorrect = selectedOptions.includes(questions[currentIndex].answer);

        setAnswers([ ...answers,
            {
                question: questions[currentIndex].question,
                chosen: [...selectedOptions],
                correct: questions[currentIndex].answer,
                explanation: questions[currentIndex].explanation,
                isCorrect,
            },
        ]);

        setSelectedOptions([]); // reset for next question

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setIsFinished(true);
            setShowConfetti(true);
        }
    };

    const handleRetake = () => {
        fetchQuestions();
    };

  // Calculate grade
    const score = answers.filter((a) => a.isCorrect).length;
    const total = questions.length;

    return (
        <>
        {/* Floating Button */}
            <button onClick={() => setOpen(!open)} className="btn btn"
                style={{ position: "fixed", bottom: "20px", right: "20px", width: "60px", height: "60px", zIndex: 1000, fontSize: "24px",}}>
                <FaBrain color="#0e1238ff" title="AI Quiz" size={30} />
            </button>

        {/* Quiz Modal */}
            {open && (
                <div className="quiz-modal position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                    style={{ background: "rgba(0,0,0,0.5)", zIndex: 2000 }}>
                    <div className="bg-white p-4 rounded shadow-lg overflow-auto" style={{ width: "90%", maxWidth: "600px", maxHeight: "90vh", }}>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div className="m-0 lead  gap-2">
                                <FaDeskpro size={40} color="#101145ff"  /> <strong style={{ color: "#101145ff" }}>
                                    Reacto
                                </strong>
                                <p className="lead  display-6" style={{ color: "#101145ff" }} >  <strong> Academy Quiz </strong> </p>
                            </div> 
                            <button className="btn btn-lg" onClick={() => setOpen(false)}>
                                <FaTimes size={40} color="red" />
                            </button>
                        </div>

                    {/* Confetti */}
                    {showConfetti && <Confetti />}

                    {questions.length === 0 ? (
                        <p className="text-center">⏳ Loading...</p>
                        ) : !isFinished ? (
                        <div>
                        <p className="lead" dangerouslySetInnerHTML={{ __html: questions[currentIndex].question, }}/>

                        {/* ✅ Single-select options using radio buttons */}
                        <div className="d-flex flex-column gap-2 mt-5">
                            {questions[currentIndex].options.map((option, i) => (
                            <div key={i} className="form-check">
                                <input type="radio" name="quiz-option" // ensures only one can be selected
                                        value={option} id={`option-${i}`}
                                        className="form-check-input" checked={selectedOptions.includes(option)}
                                        onChange={() => setSelectedOptions([option])}/>
                                <label className="form-check-label" htmlFor={`option-${i}`} dangerouslySetInnerHTML={{ __html: option }} />
                            </div>
                            ))}
                        </div>

                        <button style={{ background: "#121341ff", color: "white" }} className="btn btn-lg mt-4 w-100" onClick={handleSubmitAnswer} disabled={selectedOptions.length === 0}>
                            ☑️ Submit Answer
                        </button>

                        <p className="mt-3 text-center">
                            Question {currentIndex + 1} of {questions.length}
                        </p>
                        </div>
                            ) : (
                        <div>
                            <p className="text-success text-center mb-3">
                                🎉 Quiz Finished! Your Grade: {score}/{total}
                            </p>

                            <div className="text-start overflow-auto" style={{ maxHeight: "55vh" }}>
                                <p>📘 Review & Explanations:</p>
                                    {answers.map((ans, idx) => (
                                <div key={idx} className={`p-3 my-2 rounded ${ ans.isCorrect ? "border border-success" : "border border-danger"} bg-light`}>
                                    <p dangerouslySetInnerHTML={{__html: `Q${idx + 1}: ${ans.question}`,}}/>
                                    <p>
                                        ✅ Correct Answer: {" "}
                                        <span className="text-success">
                                            {ans.correct}
                                        </span>
                                    </p>
                                    <p>
                                        📝 Your Answer:{" "}
                                        <span className={ans.isCorrect ? "text-success" : "text-danger"}>
                                            {ans.chosen.join(", ")}
                                        </span>
                                    </p>
                                </div>
                                ))}
                            </div>

                        <button className="btn btn-lg w-100 mt-3" style={{ background: "#121341ff", color: "white" }} onClick={handleRetake}>
                            🔄 Retake Quiz
                        </button>
                        </div>
                    )}
                    </div>
                </div>
            )}

        </>
    );
};

export default QuizTester;
