import React, { useEffect, useState } from "react";
import imgDefault from "../assets/img.svg";
import LoginButton from "./LoginButton";

// import { MyContext } from "../App";


import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import ShowTag from "./ShowTag";
import { Typography } from "@mui/material";


const Delete = () => {
  // const {
  //   nameProp,
  //   emailProp,
  //   eduProp,
  //   expProp,
  //   hobProp,
  //   thumbnailURLProp,
  //   locationProp,
  // } = useContext(MyContext);

  // const [email, setEmail] = emailProp;

  const { user, isAuthenticated, isLoading, error } = useAuth0();

  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isInitialSetUpDone, setIsInitialSetUpDone] = useState(false);
  const [toDelete, setToDelete] = useState('')

  const [profileTags, setProfileTags] = useState([]);

  const api = process.env.REACT_APP_DELETE_API_URL;

  // const handleOnClick = async () => {
  //   setIsSubmitted(true);

  //   //   const data = {hash:email}
  //   //   console.log(data)

  //   //   await axios
  //   //   .post(api,JSON.stringify(data),
  //   //  { "headers": {
  //   //     "Content-Type": "application/json"
  //   // }},)
  //   //   .then((response) => {
  //   //     console.log(response);
  //   //     // console.log(response.config.data);
  //   //     // console.log(JSON.parse(response.config.data))
  //   //     setIsSubmitSuccess(true);

  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //     setIsSubmitSuccess(false);

  //   //   });
  // };



  const deleteTag = async (tag) => {

    setIsSubmitted(true);

    const data = {email:user?.email, profileTag:tag}

    await axios
        .post(api, JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);

          setIsSubmitSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setIsSubmitSuccess(false);
        });
    

    

    const tmp = profileTags.filter((profileTag) => profileTag !== tag)
    setProfileTags([...tmp])

    
  }

  useEffect(() => {
    const initialSetup = async () => {
      const data = { email: user?.email };

      await axios
        .post(api, JSON.stringify(data), {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log(response);
          console.log(response.data);

          setProfileTags(response.data);

          setIsInitialSetUpDone(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (isAuthenticated && !isLoading && !isInitialSetUpDone) initialSetup();
  }, []);

  return (
    <>
     
     {(!isAuthenticated && !error && !isLoading && (
            <div style={{ Margin: "300px" }}>
              <center>
                {" "}
                <img src={imgDefault} height="300px" alt="profile" />{" "}
              </center>
              <center>
                You are not Logged in 🤖 <br /> Please Login!! <br />
                <LoginButton />{" "}
              </center>
            </div>
          ))}

      {error && <center>Error</center>}

      {!error && isLoading && (
        <center style={{ fontSize: "300%", fontWeight: "bold" }}>
          LOADING...🤖 🤖 🤖{" "}
        </center>
      )}

      {!error && !isLoading && isAuthenticated && (
        <div
          style={{
            backgroundColor: "rgb(224, 161, 88)",
            minHeight: "600px"
            
            
          }}
        > <Typography variant='h2'>Your Existing Profiles:-</Typography>
          {/* <input type="text" placeholder="Enter Your Email" onChange={(e)=> setHash(md5(e.target.value))} /> */}
           
          <center>{profileTags.map((tag, index)=> <ShowTag tag={tag} index={index} deleteTag={deleteTag} email={user?.email} setToDelete={setToDelete} /> )}</center> <br/>

            {isInitialSetUpDone && profileTags.length===0 && <h1 style={{ height: "5px", margin:"5%", padding:"19%"}}>No Portfolio Data Available For Your Profile!!! 🤖 <hr/></h1> }

          {/* {isAuthenticated && (
            <button
              onClick={() => {
                setIsSubmitSuccess(false);
                handleOnClick();
              }}
            >
              Confirm Portfolio Removal
            </button>
          )} */}

          {(isSubmitSuccess && profileTags.length>0 && (
            <center> <h3>" Successfully Deleted Your Portfolio!" <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Profile Tag:- {toDelete}  </h3> </center>
          )) ||
            (isSubmitted && profileTags.length>0  && (
              <center style={{ padding: "10px" }}>
                Deleting Your portfolio!!! <h3 style={{ height: "5px" }}>🤖  </h3>
              </center>
            ))}
            <br/>
        </div>
      )}
    </>
  );
};

export default Delete;
