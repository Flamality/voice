import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { databases } from "../../services/appwrite.js";
import Waiting from "./components/Waiting.jsx";
import "./styles/Page.css";
import "./styles/Components.css";
import QuestionContainer from "./components/QuestionContainer.jsx";
import NotFound from "./components/NotFound.jsx";

export default function Questionnaire() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("getting ", id);
        const response = await databases.getDocument(
          "voice",
          "questionnaires",
          id
        );
        const result = response;
        setData(result);
        const questionsArray = result.questions.map((q, i) => ({
          question: q,
          type: result.questions_types[i],
          required: result.questions_required[i] || false,
          placeholder:
            result.questions_types[i] === 3
              ? (result.questions_placeholders[i] || "")
                  .split("||")
                  .map((o) => o.trim())
              : result.questions_placeholders[i] || "",
        }));
        setQuestions(questionsArray);
        setCurrentQuestion(0);
      } catch (error) {
        console.error("Error fetching questionnaire data:", error);
        setNotFound(true);
      }
    };

    fetchData();
  }, [id]);

  const next = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const prev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className='questionnaire-page'>
      <div className='questionnaire-header'>
        <p className='questionnaire-title'>{data?.title}</p>
        <p className='questionnaire-description'>{data?.description}</p>
      </div>
      <div className='questionnaire-content'>
        {notFound ? (
          <NotFound />
        ) : !data || questions.length === 0 ? (
          <Waiting />
        ) : (
          <div
            className='questionnaire-questions'
            style={{
              transform: `translateX(-${currentQuestion * 100}vw)`,
              width: `${questions.length * 100}vw`,
            }}
          >
            {questions.map((question, index) => (
              <QuestionContainer
                key={index}
                data={question}
                next={index < questions.length - 1 ? next : null}
                prev={index > 0 ? prev : null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
