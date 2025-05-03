import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Quiz = () => {

  let [index, setIndex] = useState(0);
  const [questiondata, setQuestiondata] = useState([]);
  const [question , setQuestion] = useState({})
  const [option, setOption] = useState([]);
 
  async function getQuizQuestions() {
    try {
      const api = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;
      const response = await axios.get(api);
      const quizData = await response.data.results;
      setQuestiondata(quizData);    
      setOption(randomOptions(quizData[index]));
      setQuestion(quizData[index]) 
    } catch (err) {
      console.log(`Fetch is not successful ${err}`);
    }
  }
console.log()
  useEffect(() => {
    if (questiondata.length > 0 && index < questiondata.length) {
      setQuestion(questiondata[index]);
      setOption(randomOptions(questiondata[index]));
    }
  }, [index, questiondata]);

  function handleNextQuestion() {
    if(index < questiondata.length-1)
    setIndex(index + 1);
  }

  function handleBackQuestion() {
    if(index > 0)
    setIndex(index - 1);
  }

  function randomOptions(option) {
    // console.log(option);
    const allOption = [...option.incorrect_answers, option.correct_answer];
    return allOption.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    getQuizQuestions();
  }, [index]);

  function handleColorChange(e , ele){
     console.log(e.target , ele)
     if(ele === question.correct_answer){
        e.target.classList.add("bg-Green")
       
     }
     else{
      e.target.classList.add("bg-Red");
     }
  }

  return (
    <>
      <div className="bg-navy-900 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          <h1 className="text-3xl font-bold text-navy-900 mb-2">Quiz App</h1>
          <hr className="border-gray-200 mb-6" />
          <div className="mb-8 quiz-container">
          
              <div>
                <h2 className="question text-xl font-semibold text-navy-900 mb-4">
                  {index + 1}. {question.question}
                </h2>
                <div className="space-y-4">
                  <div className="relative">
                    {option.map((ele) => (
                      <li key={ele} className={`block mb-2 w-full  p-4 border rounded-md cursor-pointer transition-all duration-200 peer-checked: hover:bg-gray-50`} onClick={(e)=>handleColorChange(e,ele)}>          
                          {ele}                        
                      </li>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center items-center gap-2 mt-2">
                  <button
                    className="next bg-blue-950 text-white font-medium py-3 px-10 rounded-md hover:bg-navy-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-opacity-50"
                    onClick={handleBackQuestion}
                  >
                    Back
                  </button>
                  <button
                    className="next bg-blue-950 text-white font-medium py-3 px-10 rounded-md hover:bg-navy-800 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-opacity-50"
                    onClick={handleNextQuestion}
                  >
                    Next
                  </button>
                </div>
              </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Quiz;
