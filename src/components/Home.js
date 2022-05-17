import React from "react";
import "./Style.css";
import imgDefault from "../assets/img.svg";

import Form from "./Form";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";


const Home = () => {
  const { isAuthenticated } = useAuth0();
  const { error, isLoading } = useAuth0();
  return (
    <div className="App">
      <main>
        {error && <center>Error</center>}
        {!error && isLoading && (
          <center style={{ fontSize: "300%", fontWeight: "bold" }}>
            LOADING...🤖 🤖 🤖{" "}
          </center>
        )}

        {(!error && !isLoading && isAuthenticated && (
          <Form />
        )) ||
          (!error && !isLoading && (
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
      </main>
    </div>
  );
};

export default Home;
