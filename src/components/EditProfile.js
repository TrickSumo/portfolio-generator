import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
import Result from "./Result";

import { useParams } from 'react-router-dom'

import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";






const EditProfile = () => {

  
    // States to hold initial data fetched from api_fetch

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [thumbnailURL, setThumbnailURL] = useState('');
    const [location, setLocation] = useState('');

    // Lists of Education (edu), Experince (exp) and Hobbies (hob)
    const [edu, setEdu] = useState([]);
    const [exp, setExp] = useState([]);
    const [hob, setHob] = useState([]);
    const [profileTag, setProfileTag] = useState('');

    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {user, isAuthenticated, isLoading} = useAuth0();
    const [isInitialSetUpDone, setIsInitialSetUpDone] = useState(false);


  

    const params = useParams();
    console.log(params.tag)

    const api_fetch = process.env.REACT_APP_EDIT_API_URL;


    useEffect(() => {
      const initialSetup = async () => {
        setProfileTag(params.tag)
        const data = { email:user?.email, profileTag:params.tag };
  
        await axios
          .post(api_fetch, JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            
            console.log(response.data);

            setName(response.data.name);
            setEmail(response.data.email);
            setThumbnailURL(response.data.thumbnailURL);
            setLocation(response.data.location);
            setEdu(response.data.edu);
            setExp(response.data.exp);
            setHob(response.data.hob);

            



            setIsInitialSetUpDone(true);
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
      if (isAuthenticated && !isLoading && !isInitialSetUpDone) initialSetup();
    }, []);


    const data = { name, email, thumbnailURL, location, edu, exp, hob, profileTag };
    const api_edit_portfolio = process.env.REACT_APP_CREATE_API_URL;

    const handleOnSubmit = async () => {
      setIsSubmitted(true);
  
      await axios
        .post(api_edit_portfolio , JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          // console.log(response.config.data);
          // console.log(JSON.parse(response.config.data))
          setIsSubmitSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setIsSubmitSuccess(false);
        });
    };

    
  return (
    <div>
      <div className="form">
        <div className="form-element-top">
          <figure style={{ textSize: "10emu" }}> 
            <img src={thumbnailURL} height="300px" alt="profle" />
            <figcaption>{name}</figcaption>
            <figcaption> {location}</figcaption>
          </figure>
        </div>
      </div>

      <div className="flex-container">
        <div>Education</div>
        <div>Experince</div>
        <div>Hobbies</div>
      </div>

      <div className="flex-container">
        <div>
          {" "}
          <Tasks tasks={edu} setTasks={setEdu} />{" "}
        </div>
        <div>
          {" "}
          <Tasks tasks={exp} setTasks={setExp} />{" "}
        </div>
        <div>
          {" "}
          <Tasks tasks={hob} setTasks={setHob} />{" "}
        </div>
      </div>
      <br />
      <center>
        {" "}
        <button
          className="submitButton"
          onClick={() => {
            setIsSubmitSuccess(false);
            handleOnSubmit();
          }}
        >
          SUBMIT
        </button>{" "}
      </center>

      {(isSubmitSuccess && <Result hash={email} profileTag={profileTag}/>) ||
        (isSubmitted && (
          <center style={{ padding: "10px" }}>
            Generating Your portfolio!!! <h3 style={{ height: "5px" }}>🤖</h3>
          </center>
        ))}
    </div>
  )
}

export default EditProfile