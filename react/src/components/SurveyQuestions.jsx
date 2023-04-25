import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";
import { json } from "react-router-dom";

export default function SurveyQuestions({questions, onQuestionsUpdate}) {

  const [MyQuestions, setMyQuestions] = useState([...questions]);

    const addQuestion = (index) => {
    index= index !== undefined ? index : MyQuestions.length;
      MyQuestions.splice(index, 0, {
      id: uuidv4(),
      type: 'text',
      question: '',
      description: '',
      data: {},
    })

        setMyQuestions([...MyQuestions]);
        onQuestionsUpdate(MyQuestions);
  }

  const questionChange = (question) => {
    if (!question) return;
    const newQuestions = MyQuestions.map((q) => {
      if (q.id === question.id) {
        return { ...question };
      }
      return q;
    });
      setMyQuestions(newQuestions);
      onQuestionsUpdate(newQuestions);
  }

    const deleteQuestion = (question) => {
      const newQuestions = MyQuestions.filter((q) => q.id !== question.id);
      setMyQuestions(newQuestions);
      onQuestionsUpdate(newQuestions);

  }

  useEffect(() => {
    setMyQuestions(questions);
  }, [questions]);




  return (
    <>
      <div className="flex justify-between">
              <h3 className="text-2xl font-bold">
                Questions
              </h3>
        <button
          type="button"
          className="flex items-center text-sm py-1 px-4 rounded-sm text-white
           bg-gray-500 hover:bg-gray-700"
          onClick={()=>addQuestion()}
        >
          <PlusIcon className="w-4 mr-2" />
          Add question
        </button>
      </div>
      <br />

      {MyQuestions.length ? (MyQuestions.map((q, ind) => (
        <QuestionEditor
            key={q.id}
            index={ind}
            question={q}
            questionChange={questionChange}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
          />
      )
      )) : (<div className="text-gray-400 text-center py-4">
            you don't have any questions created </div>) }

    </>

    )
}
