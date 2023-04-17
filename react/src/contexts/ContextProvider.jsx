import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  surveys: [],
  questionTypes: [],
  setCurrentUser: () => { },
  setUserToken: () => { },

});

const tmpSurveys = [
  {
    "id": 1,
    "image_url": "data:image/jpeg;base64,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",
    "title": "TheCodeholic YouTube channel",
    "slug": "thecodeholic-youtube-channel",
    "status": true,
    "description": "My name is Zura.<br>I am Web Developer with 9+ years of experience, free educational content creator, CTO, Lecturer and father of two wonderful daughters.<br><br>The purpose of the channel is to share my several years of experience with beginner developers.<br>Teach them what I know and make my experience as a lesson for others.",
    "created_at": "2022-01-07 13:23:41",
    "updated_at": "2022-01-18 16:34:19",
    "expire_date": "2022-01-23",
    "questions": [
      {
        "id": 15,
        "type": "text",
        "question": "From which country are you?",
        "description": null
      },
      {
        "id": 16,
        "type": "checkbox",
        "question": "Which language videos do you want to see on my channel?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "8ee03188-9e7e-44e5-9176-7574c0beec6f",
              "text": "JavaScript"
            },
            {
              "uuid": "fe9497f2-8f05-4c82-9586-26e36736fa9e",
              "text": "PHP"
            },
            {
              "uuid": "db0f194c-d32d-4e19-929e-08f7b4e2bcc0",
              "text": "HTML + CSS"
            },
            {
              "uuid": "93273c4c-ac8f-432e-b847-e467df64ab9c",
              "text": "All of the above"
            },
            {
              "uuid": "d54818a7-ad7e-4b69-9287-16a8dc50a6cb",
              "text": "Everything Zura thinks will be good"
            }
          ]
        }
      },
      {
        "id": 17,
        "type": "select",
        "question": "Which PHP framework videos do you want to see on my channel?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "fb907cfe-b7a1-4b24-86fb-03f9c44aa710",
              "text": "Laravel"
            },
            {
              "uuid": "e2629262-93ca-4a7a-8129-19c765664a04",
              "text": "Yii2"
            },
            {
              "uuid": "9a11a425-d9fe-4fe9-86af-bb814e3d9271",
              "text": "Codeigniter"
            },
            {
              "uuid": "484268b1-d3aa-47f8-a185-356ed48e50fe",
              "text": "Symfony"
            }
          ]
        }
      },
      {
        "id": 18,
        "type": "radio",
        "question": "Which Laravel Framework do you love most?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "c02e50e6-5ebf-4344-9822-baa16502dbdb",
              "text": "Laravel 5"
            },
            {
              "uuid": "90a15aae-ef4c-4d04-aa05-8e840d4a2ded",
              "text": "Laravel 6"
            },
            {
              "uuid": "93c64532-c1eb-4bfd-bd00-ab51cafdee78",
              "text": "Laravel 7"
            },
            {
              "uuid": "51f6a704-7a86-47a4-9b2d-72bb026a3371",
              "text": "Laravel 8"
            }
          ]
        }
      },
      {
        "id": 19,
        "type": "checkbox",
        "question": "What type of projects do you want to see on my channel built with Laravel?",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque earum eos esse est ex facilis, iure laboriosam maiores neque nesciunt nulla placeat praesentium quae quos ratione, recusandae totam velit!",
        "data": {
          "options": [
            {
              "uuid": "c5519ab0-3282-4758-a34b-506052bf1342",
              "text": "REST API"
            },
            {
              "uuid": "dfbbc0af-8fff-44ae-be36-e85270041729",
              "text": "E-commerce"
            },
            {
              "uuid": "6940c122-505f-4d9d-a103-472f923fad94",
              "text": "Real Estate"
            },
            {
              "uuid": "2b3c12a4-8f3c-4276-ae59-4e9d55e849be",
              "text": "All of the above"
            }
          ]
        }
      },
      {
        "id": 22,
        "type": "textarea",
        "question": "What do you think about TheCodeholic channel?",
        "description": "Write your honest opinion. Everything is anonymous.",
        "data": []
      },
      {
        "id": 23,
        "type": "text",
        "question": "Which channel is your favorite one?",
        "description": null,
        "data": []
      }
    ]
  },
  {
    "id": 2,
    "image_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARUAAAC2CAMAAADAz+kkAAAAb1BMVEX///8A3P8A2/8A2f/1/v/6//+79f/m/P/p/P8A3v/w/f+R7P8g3//F9f/5///u/f/f+v9s6P+v8v+n8f966v/Z+f9F4P9Z5f/B9f9V5P+d7/+H7P+28//U+P/N+P9z6f844/+g7f+D6P+X7P+D7f+pm44WAAARRUlEQVR4nO1d7cKiOA+VCgpS5VMQUWSeee//Gl/apl/QAuOOCrueH7uPCA4NbZImJ2Gz+eKLL75YKQ778/HSxP7piWv9+Jhds13s//W7+iyavHUQQVDlu8OfXOnFYYkRA06Or7rBD+BcIeQAiGSSizfzyuhaIHltd3EVv/RO34hMGRcMDl/nrKQ4dwaXOunL7/ctCHsDg9GFU/Nln/RFwq7M3nLXL0ZmGhqVy+jwDrlRJuTCy7tu/XWIFYWCkDZS1DbWy9JAO1O7Nvgjdb1IVDAWVOR1WD9aXXnm5gHGFVJFEpR1lmZ1wX/q8eYx/HU0MJLg5tLP7v5aOYpcsGk5ZOoZweMYscPejR9buyHiD11dK/eHoxjquq913USV2lV13S7sG5S/4c5fCB+GcdUPE5MrtYvust6x/Apnrn5hDd+9+LZfjCsbBR58EZdy7I66iqRz000jt3+Zi9lXu1fe9MvBFpDRxbhIK6NMpVyZQybtwZyfdS8hD6bK3vit9EhQwo64wvbYvJmzY5l8K8KRPdnK8nUjVAhqiYmO5efKLMjNhpnn7ZpdFqZWUGj7/iDMDerm012oYGTfDjzQ6hXLDxuC3YXt5MZdMyzcWRSM+PQ3ZDJqqwIzNMGY03UMpCoZU7McdyaVn799q+/DqaVDwKMxNF/6J0wo5cAeq4gDVT2vES4bQTEeS3FLVSxTRtfHbD7NjVstDyAVmwkSeCguvlUz898smFSeif8uAwemA8rJE6UpqqdO9ZhpxqPLbNGYK5WdsoJG7BUDc/SCf71UGlXZBueJs/8jUmFWRSiWYCLr89+QykE4b9ydGx9wtXa94jrTNshruablKnfi/NVr2zmWWcgiEyGlUZflUKzeX2ExomLkufJkEfVTuN8ytssBL65ar1S8SY8/5XJgfgr3cke2xOv3+Cd3h9wm80EKJWO3zyzstObdIcQbkW2IEWwM5Xo48CNWbdpMhGxWAIiy2vgVFRdBJA7xVKPVnGf2SPBakI2GiLjNcdS5dFTVrwH5ZCBr8YDpblaNO7NqFdl6c0AOsgaR8ct1AJzbwvSdD44+eriRLxEdwBAhY5LdK5g2fvGNvxZs5APT7LkHXyQ5WhwE5Lzuc/cHxpirlso/uH23hOkd1L7p/l8DGPpdHnGbLEwqPCAxGdCdgqtHmDWKPWpWH7bdCCN0ox/OaVgFAxbLlGQox7AMU6aSr+s3Qdx3RYm7C9s/E4dBOG24A6WzahO02eyRHNWTAtFFA399elz/ELMngsSMK9acZj7d62JKHE6A27aqyoShrKqW2KQp4RT1fZ1B/jgsHMPQlNmAknO87xwU9yTtr3dyD5G/j2MZ9jfzS50iXB0PzE2roe0l48NFGXJPH485qD53W+qwLLBBNt2BKl1TRM6v8ZCO3blr+e1OCBjAhZzgze74frr7e3+/PVpnMPUQwvVaKh7Oj+GcR1XacAcewm+T/NCkx6k7NFlrWJCPqVTJEhCXukxgaHKDuOffTM1+l58opwMEpfR/AJVLl4uvy4TUd8Bf4hQeVJnm5fA1JEIthy37sTzo/SvlkteRF6p324kk74YOrEeuRAZDHUHVU0DgKbebzUUXjIG1uxgcVSYKckpGx6511iM3LTbemwq+2LjTViqbIPdWqisJ4WUWVLlqkUZnHLg3AZx1iIgAAXdm3DXUFK4Lv8TVSFwrjwGhfIFm+lyoMsmkK8KJw/RZRizgYkhyeYfoMDwI6jWgPycXEEd0VeVSLE7rqpxirDtXD2UJ5WZXJUrzqsVtld968TeNuF8awvtuphDcg4UxK2VpFHKuvZnMl1B3+GxUtfsc9j0kklLrDi93WrppEMG/0ZsR7lWpCVhU3OUq7+sxcOMZZ4uGnhLTwK6a/9ErLAQaB5EjBJyGWWtfFoksiXGabsUcNoWDck7YuKvrgUPjChJstZQAbJpQw6P7pnE3Yv1uFzNbeArHluKAdePsK1V3AgZC6f3MAZR1Bb8SmE26mC7bhVhonsJwkKWo1oOn3BpmeT0USk+hcpXVjlOEhGab4kq9CVwhOtanlGnbFzWFfDQJpTtTSQqcWk3tWM0MJ3nP8ppfDm48g7v1lEhlvqkz6lRYpKLSU27qOSMcJ65cllDZ6/Fs19h6VmjGWsz1YotDakF8ZbKM8nGPBpF+CNyujJrERhmXqnwMqhbOUhXuTrl6NCrJtxP2Wfsu1DYvQoN83OpUEVHIIbDq5MpiqgmdAWp9kuD9cjDNYKWoAISF0KbKfSSQrzp6YrJMBWWOI9n+dyJij3uSI8AHq51oVSv9VYBNV5sA2f5P8zhiPGdmy5iA5tKkI1LRDAmYIfRr6p9higp/OieyB6Ln1Hn1P5IKV6OTCgOI23NCWq8EOOTBhDH0+Gi1XKjFhxuuIOHvTASWPFhBH69gBbU/oQaltr0pR89WoejUUnn1xN7vNssgvgFgmdvxpygsM1InS2S3zBqfW0yVCY6TWyzFMsPzHg/Eql6cOlkSqxenBhuUbj/jHgDfai4gUsnTE7eRc9TCQnWyWBWLqlY8ZUaNMtVTJQf7afB5MKJaDrbd4aYyi0Wz9HpjKLsrIpiqiyBCiUoNqyrsRRIU5snZMlkUh8PlDFT2X+t+iwtvIf2NXL5NsWk5HnWqnOHAriaxaNOJ18pAhN9WHC2Ki5ZSTyW2M6gyxsFEhBK2yBr91hCM0zQ3RPrQI4IvjRtiXxq5z2+YAXL3Zuz8V/ej2dqc6jfZQ/oi4W1qYjBYxkKzVDZZWFBKSLruBtoEBNzIskh6OVGKm9YoodcV7A5HcyH74Qo5K92QFtWP8SYfltOnH91llizmotNOOIS0KSljiPVybDBgEqIGtds3MX6u/Ntj7sEH0KiJzVDbh0A6iJoGvknszfNTE5Ytbstr09tPcV5H2P8hjqhWU7mLsMkqIsX10OeL2rbrwO9/Xmj1BLIOqOFpBkvIr9V+e2Zd/2FctV6KCX9uoBmgxVtmUrhW9OIPvSV0LLV/cUHJVBV7vXskvlJfrNfLjBcWzgkMxXBuC59VglB81Xia4w1+Potep1GnTfewXRaapOmNdAycHMhdENg24U2ctXrKPliU7enDrXsdWB3u0IpTeKpxOk3Od3tSvcLPtjrDGQXDJoQLg6YAHbF9kbY44t9MhZz5nlJJ1psiD8jJPx2QnIP9kJndzfp8twd7zRXuVPl6oqvag3/Lh8USCgFv6Yiy1kS7b5Nw57se98xGIzIqBdVz/V2dYBOVX2/0ungcS0NlIWvI//Pgn8dGJDL2jx9Wljf8MadcCFflD3BIW2MRi1IJU12a2KQnD3GzE3sb24+02adzYU8iSqvhgHpzB21J5RRuGTAOnO7IZElZm61Bw1phj+IbBDS7NnHldYce8AjxXyjHpG/6MO+bVwYgCZRefH20RqU5WyBBkWe+B/vmxTAln4JalO369+ujwsEfLRUqD1w9sjN7x87FEE1YHYZ9QaL4nuVlgfG0YBAuiqRO77FibNgOfOV9Etj+ztDCyN0L7x0zaH/RoSeGVzBx+u07bv5lYMrRyD3ysOL5e657iA6uS8QA+SWEjTkOCAKvxc03IaImyML54QmRXoqaZ4gsKQyI9C8sQPtHONqTFRsl23cbXGJPEoL+XmjgbRYmWlOJVxJIbXwWHXws1/wLGrBAdNKWzjuJJmBcTYheaVY+DPSLWwQt/UmwzvN2PsleCIEZX/7uBmRvvAe9BVfchxJU40jnedFckLHMRatOe4gA+FFLybE/ASAjjHWeF40oyZLIJzQtAeRnV9z1F0pMRzlzgmGRzOvkyumJH6dJPg1WtIuKUR0g+pRW6rSZOn/NUpnVj59TTwQtZ/x0kMqq4rUa5kmlVyw2pUf/I1LR3vSBLNWWEv8VqUCJBLO4k1zZcu3bw1nalkDwcWdwZVevbU8zLDNBrqygamq4q7fMM7y4Dif9TTnFuGKB/gIr9uKmPf4OkWaCnNES4I2oVVyxx8/fSzY2zLt8A5f4Y4yMcgYNvuLd4XTfVVn64zSSSTwSwm9GA1mrAMTirJwMV3uznydzy63VQAML7PdrbvgtgE5MNtOsvAWyogEWYYxQYJtf82rXlg1wz4yK5SRZUSgB5am0tymNOprzmFesbMV8N/FIj9L2KFH+i/L6w6thioGmal92x+8Ar+MeUE182awSOepyiBVhtYOQ3AmSZGsO8W8EcbhnMjSeeY8pe5LleAiVPfIBpyWvmr0ih6GmfGKVfmqwsanS1AtV6pW818sSKgv/CXg7MzHnfY1JaH6RrK92XEHBD19h4hVM66avbJS4rFP+ysIy2Grc+4elXi7TekwihKskEdJcdTKIwZM+SZ+3glr7M496rYPVaycDUyvAXXudoTLOIBvdy9wrC/dn3R4cx87Yar1XWmXCpTCSStfN/hI49nlNnZ4I58RdvWMZ9C8N1szR0LBP1JKvTu/uZkfSzqSrvxJrSNYbrx3iXGNgWeNk94fK8p6VsJ1qwwX0hfi72DeXy/H+JMv8cL7fz6veEX7xxRdffPHFF1988cUXf4b98Xa77RbTxsmOHS/xIVU+ZX75Byly4974t4N5Q9JLBQE6XC+9gnenRkNIzfGze9woN9YUhYgmpDckHCzzAMtr0aODSUUW4aLgueeYYnOXZxLkp1Kh0X7+z6Bg2QEGKpWCgQbgniubJHmBUan4VOb58X7OSehl4UF/IhWerHEzOlueUS3JlFQI6wVetEL5l8vmmVKpiOQwSY0+9SKFSankSOYPwy1C20WH/XWpEP4AS1P4Nd5uUSWi8+ek3XYHWtk75VeFttugJKHq4y9CCMS/fg2D+VwqRN6cbRdlaZotOpqrSyXkn1LQvVwt1lwZ88ZdR4cfaF3xli4DoZ9LhfI10O9Fy0JCkwptv070CtECzFwgWlbGP9OhES/s6MgzWl6ANiaVeMsTKMcVBHOpVH43R4KcGCFCiSP0JFTdvV13gNBxDuT/Zez6V4dl5ekBnHn+/8gV2e2HhvR/foZcIGGZRdEZcpIFvAJmHDvhRsBMILRYohppL0FiLrqZdK5wwHoLloiK7Rc5la6tnFzG1Ma4v+LJ1nQIFavw4uT9VntWKAgMWiIfQleJ9tQ/9R6Iuhot4jTLc1WH99O0DequVVpqLa4pZw9irpCbxTV9hrTfA9OyKRI1Ue4h+ymYA0berasTj2dIpbNrSlZx2SwFpleOF7rsMXuClHOb/BAQPi3p++DtEryFNVbSCmWdvj1LKh3iC/TUWjYpWdggWpHLqJNHRdd0f229zZ1OfiEV0v/2Oal0OO0oL2ryZTGfhLTM9N0S1BthUtkKHKKA2ugyO/8PzZNK1FxSqp65VA7NRZJfiFi27xjds1D8FcqEJBVfVCrq86X7XapHciqVvXCBOXpSIT49e6EJ+VEcba5k+QkXjtjz7ZKLHRSpHDDzyRibuvfyNdhKJ8wGYbG39nGZXP3+nvk34m8xJJcW3qbZqqqEa6vFQvVtKQuUEJMKxLf6ZZmHZyoEaohJAR75hrj4rN5nR5TPuS+VC4JyBg/8QsbiBbN1XXwoQfP46X4miJiDH3ob70p65l1ZfcIRmgST8VAjRF7dfsaMSxsyMfHwwIna3zC+EA1Cmbusfqa8nc9pSfX6ov04TSq0a0i3NKgfioqkgCXFWiOUYFSJ/0K3kUHCXll+B1VdlGIfVEs3CMqlKmnYno5tvQ36npmtoeNmX3BDjGgJIh+SUwcQMMrZEQdecxDDbpH/kPTvOb3dVVpmo8mesB+GLpVNTm66dTduDY3fHtSSuAn91N43pE0ljaLcMHvwFVsKKWsqJwzLCX4A5YJQl7Z8310tfntow6lJ07QRu/74lqa9RM69O3QRBtztPh3VsKNHfkAPG8THlPzoooOTX3zxxRdffPHFF1+8Ef8HiaLEkg69+7oAAAAASUVORK5CYII=",
    "title": "React",
    "slug": "react",
    "status": true,
    "description": "React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.",
    "created_at": "2022-01-07 08:50:40",
    "updated_at": "2022-01-07 13:37:37",
    "expire_date": "2022-02-01",
    "questions": []
  },
  {
    "id": 3,
    "image_url": "data:image/png;base64,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",
    "title": "Laravel 9",
    "slug": "laravel-9",
    "status": true,
    "description": "Laravel is a web application framework with expressive, elegant syntax. We\u2019ve already laid the foundation \u2014 freeing you to create without sweating the small things.",
    "created_at": "2022-01-07 13:28:56",
    "updated_at": "2022-01-07 13:28:56",
    "expire_date": "2022-01-20",
    "questions": []
  },
]

export const ContextProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN')||'');
  const [surveys, setSurveys] = useState(tmpSurveys);
  const [questionTypes] = useState(['text','select','radio','checkbox','textarea'])

  const setUserToken = (token) => {
    if (token) {
     localStorage.setItem('TOKEN', token);
    } else {
      localStorage.removeItem('TOKEN');
    }
    _setUserToken(token)
  }
  return (
    <StateContext.Provider value={{
      currentUser,
      setCurrentUser,
      userToken,
      setUserToken,
      surveys,
      questionTypes

     }}>
      {children}
  </StateContext.Provider>
  )
}
export const useStateContext = () => useContext(StateContext)
