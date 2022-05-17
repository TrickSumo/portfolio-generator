import React, { useState, useContext } from "react";
import { MyContext } from "../App";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { TextField, Typography } from "@mui/material";
import { Button } from "@mui/material";


import "./Style.css";

import imgDefault from "../assets/img.svg";

import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

const Form = () => {
  const { user, isAuthenticated } = useAuth0();

  // Creating email hash 
  var md5 = require("md5");
  const hash = md5(user?.email);
  



  const {
    
    nameProp,
    emailProp,
    eduProp,
    expProp,
    hobProp,
    thumbnailURLProp,
    profileTagProp
  } = useContext(MyContext);

  

  const [name, setName] = nameProp;
  const [email, setEmail] = emailProp;
  const [thumbnailURL, setThumbnailURL] = thumbnailURLProp;

  // Lists of Education (edu), Experince (exp) and Hobbies (hob)
  const [edu, setEdu] = eduProp;
  const [exp, setExp] = expProp;
  const [hob, setHob] = hobProp;
  const [profileTag, setProfileTag] = profileTagProp;

  //States for this component only

  const [isValidThumbnailURL, setIsValidThumbnailURL] = useState(false);
  const [isSubmitEnabled, setSubmitEnabled] = useState(true);

  const [signedURL, setSignedURL] = useState('');
  const [isUploadEnabled, setIsUploadEnabled] = useState(false);
  const [fileName, setFileName] = useState('');

  const api = process.env.REACT_APP_GET_S3_SIGNED_URL_API_URL




  const getSignedURL = async () => {

    const data = { hash,  profileTag};

    await axios
      .post(api, JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setSignedURL(res.data);
      })
      .catch((error) => console.log(error));
  };

  const uploadImage = async () => {
    await axios
      .put(signedURL, fileName, {
        headers: {
          "Content-Type": "image/png",
        },
      })
      .then((response) => {
        console.log(response);

        setEmail(hash);
        setThumbnailURL(process.env.REACT_APP_PORTFOLIO_URL+hash+profileTag+".jpeg");
        setIsValidThumbnailURL(true);
        setSubmitEnabled(true)
      })
      .catch((error) => console.log(error));
  };

  const handleOnClick = (e) => {
    e.preventDefault();

    if (!isUploadEnabled) {
      setIsUploadEnabled(true);
      getSignedURL();
      return;
    } else if (fileName){
      uploadImage();
    }
  };

  // Create hash of email
  var md5 = require("md5");

  // https://reactrouter.com/docs/en/v6/getting-started/overview#navigation
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    if (isValidThumbnailURL) {
      navigate("/form2");
    } else {
      setSubmitEnabled(false);
    }
  };


  return (
    <div className="form">
      <div className="form-element-top">
        <figure>
          <img
            src={isValidThumbnailURL ? thumbnailURL : imgDefault}
            height="300px"
          />
          <figcaption>{isValidThumbnailURL && name}</figcaption>
        </figure>
      </div>

      <div className="form-element-bottom">
        <form onSubmit={onSubmit}>

          {/* Name:{" "}
          <input
            type="text"
            placeholder="Enter Your Name" 
            onChange={(e) => setName(e.target.value)}
          />{" "}
          <br /> */}

          
        
        

          <div style={{margin:"10px", textAlign:'center', fontWeight:"Bold"}}>
          <Typography variant='h3' >Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <TextField  align='inherit' 
         id="outlined-basic" label= "Enter Your Name"    onChange={(e) => setName(e.target.value)}/>
         </Typography> 

         <br/>
         <Typography variant='h3' >Profile Tag: <TextField  align='inherit' 
         id="outlined-basic" label= "Enter Unique Portfolio Tag"  onChange={(e)=>setProfileTag(e.target.value)}/>
         </Typography> 
         </div>

          <div style={{marginTop:"30px", marginBottom:"10px"}}>
            
          {isUploadEnabled && (
            <TextField
              type="file"
              onChange={(e) => {
                console.log(e.target.files[0]);
                setFileName(e.target.files[0]);
              }}
            ></TextField>
          )}
          <Button
            color="primary"
            variant="contained"
            component="span"
            onClick={handleOnClick}
          >
            Upload Image
          </Button>
          
          </div>

          {email || !isSubmitEnabled ? (
            isValidThumbnailURL ? (
              <span className="noerror"> <br/>✅ Image Uploaded</span>
            ) : (
              <span className="error">
                {" "}
                <br/> ❌ Please Upload Your Photo!!!
              </span>
            )
          ) : (
            ""
          )}
          <br />
          {/* { isValidThumbnailURL && <input type="submit" value="Next" /> } */}
          <input
            className="submitButton"
            type="submit"
            value="Next"
            // disabled={!isSubmitEnabled || name===''}
            disabled={!isSubmitEnabled}
          ></input>
          {/* style={{backgroundColor:"rgb(13, 145, 221)" , color:"black"}} */}
        </form>
      </div>
    </div>
  );
};

export default Form;
