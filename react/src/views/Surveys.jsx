import PageComponent from "../components/pageComponent"
import { useStateContext } from "../contexts/ContextProvider";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import axiosClient from "../axios";
import { useState } from "react";
import PaginationLinks from "../components/PaginationLinks";

export default function Surveys() {
//   const { surveys } = useStateContext();

    const [surveys, setSurveys] = useState([]);
    const [meta, setMeta] = useState({});
    const [loading, setLoading] = useState(false);
    const {showToast} = useStateContext()

    const onDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this survey?")) {
            axiosClient.delete(`/surveys/${id}`)
                .then(
                    () => {
                        getSurveys();
                        showToast('The survey was deleted successfully')
                }
            )

      }

  }
    const onPageClick = (link) => {
          getSurveys(link.url)
    }

    const getSurveys = (url) => {
        url = url || '/surveys';
       axiosClient.get(url)
            .then(({data}) => {
                setSurveys(data.data);
                setMeta(data.meta);
                setLoading(false)
        })
    }

    useEffect(() => {
        setLoading(true)
        getSurveys()
      }, [])

  return (

    <PageComponent title='Surveys'
    buttons={(
      <TButton color="green" to="/surveys/create">
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Create new
      </TButton>
)}
      >
          {loading && <div className="text-center text-lg">
              Loading...
          </div>}
          { !loading && <div>
              {surveys.length === 0 &&
                  (<div className="py-8 text-center text-gray-700"> you don't have surveys created
                  </div>)}
              {!loading && <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
                  {surveys.map(survey => (
                      <SurveyListItem survey={survey} key={survey.id} onDeleteClick={onDeleteClick} />
                  ))
                  }
              </div>}

              {surveys.length > 0 && <PaginationLinks meta={meta} onPageClick={onPageClick} />}
          </div>}
    </PageComponent>

  )
}
