import React from "react";
import Tasks from "./Tasks";

import { useState, useContext } from "react";
import { MyContext } from "../App";
// import { Typography } from "@mui/material";
// import { TextField } from "@mui/material";

import axios from "axios";

import Result from "./Result";

const Form3 = () => {
  const {
    nameProp,
    emailProp,
    eduProp,
    expProp,
    hobProp,
    thumbnailURLProp,
    locationProp,
    profileTagProp
  } = useContext(MyContext);

  const [name, setName] = nameProp;
  const [email, setEmail] = emailProp;
  const [thumbnailURL, setThumbnailURL] = thumbnailURLProp;
  const [location, setLocation] = locationProp;

  // Lists of Education (edu), Experince (exp) and Hobbies (hob)
  const [edu, setEdu] = eduProp;
  const [exp, setExp] = expProp;
  const [hob, setHob] = hobProp;
  const [profileTag, setProfileTag] = profileTagProp;

  //Local

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const [profileTag, setProfileTag] = useState("default");

  const data = { name, email, thumbnailURL, location, edu, exp, hob, profileTag };
  const api = process.env.REACT_APP_CREATE_API_URL;

  const handleOnSubmit = async () => {
    setIsSubmitted(true);

    await axios
      .post(api, JSON.stringify(data), {
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

      {/* <div style={{margin:"10px", textAlign:'center', fontWeight:"Bold"}}>
         <Typography variant='h4' >Profile Tag <TextField  align='inherit' 
         id="outlined-basic" label= "Unique Portfolio Tag"  onChange={(e)=>setProfileTag(e.target.value)}/>
         </Typography> 
         </div> */}

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
  );
};

export default Form3;
