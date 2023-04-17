import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";

export default function SurveyQuestions({survey, onSurveyUpdate}) {

  const [model, setModel] = useState({ ...survey });
  const addQuestion = (index) => {
    index= index !== undefined ? index : model.questions.length;
    model.questions.splice(index, 0, {
      id: uuidv4(),
      type: 'text',
      question: '',
      description: '',
      data: {},
    })

    setModel({
      ...model,
      questions: [
        ...model.questions,

      ],
    });
  }

  const questionChange = (question) => {
    if (!question) return;
    const newQuestions = model.questions.map((q) => {
      if (q.id === question.id) {
        return { ...question };
      }
      return q;
    });
    setModel({
      ...model,
      questions: newQuestions,
    });
  }

    const deleteQuestion = (question) => {
      const newQuestions = model.questions.filter((q) => q.id !== question.id);
      setModel({
        ...model,
        questions: newQuestions,
      });
  }

  useEffect(() => {
    onSurveyUpdate(model);
  }, [model]);

  return (
    <>
      <div className="flex justify-between">
        <h3 className="text-2xl font-bold">
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

      {model.questions.length ? (model.questions.map((q, ind) => (
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