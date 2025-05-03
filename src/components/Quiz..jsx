import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Quiz = () => {
  const [index, setIndex] = useState(0);

  const data = [];
  const [questiondata, setQuestiondata] = useState([]);

  function handleNextQuestion() {
    setIndex(index + 1);
  }

  async function getQuizQuestions() {
    try {
      const api = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
      const response = await axios.get(api);
      const quizData = await response.data.results;
      // console.log(quizData);
      setQuestiondata(quizData);
    } catch (err) {
      console.log(`Fetch is not successful ${err}`);
    }
  }

  useEffect(() => {
    getQuizQuestions();
  }, []);

  return (
    <>
      <div className="bg-navy-900 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Quiz App</h1>
          <hr className="border-gray-200 mb-6" />
          <div className="mb-8 quiz-container">
            {questiondata.map((ele) => (
              <div>
                <h2 className="question text-xl font-semibold text-navy-900 mb-4">
                  {index + 1}. {ele.question}
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="radio"
                      name="country"
                      className="hidden peer"
                    />
                    <label className="block w-full p-4 border rounded-md cursor-pointer transition-all duration-200 peer-checked:bg-green-100 peer-checked:border-green-300 hover:bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span>{ele.incorrect_answers[0]}</span>
                      </div>
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="radio"
                      name="country"
                      className="hidden peer"
                    />
                    <label className="block w-full p-4 border rounded-md cursor-pointer transition-all duration-200 peer-checked:bg-green-100 peer-checked:border-green-300 hover:bg-gray-50">
                    {ele.incorrect_answers[1]}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="radio"
                      name="country"
                      className="hidden peer"
                    />
                    <label className="block w-full p-4 border rounded-md cursor-pointer transition-all duration-200 peer-checked:bg-green-100 peer-checked:border-green-300 hover:bg-gray-50">
                    {ele.incorrect_answers[2]}
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      type="radio"
                      name="country"
                      className="hidden peer"
                    />
                    <label className="block w-full p-4 border rounded-md cursor-pointer transition-all duration-200 peer-checked:bg-green-100 peer-checked:border-green-300 hover:bg-gray-50">
                      {ele.correct_answer}
                    </label>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-2">
                  <button
                    className="next bg-blue-950 text-white font-medium py-3 px-10 rounded-md hover:bg-navy-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-opacity-50"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
