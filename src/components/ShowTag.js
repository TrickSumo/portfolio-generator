import { Button } from "@mui/material";
import React from "react";
import { Link } from 'react-router-dom'

const ShowTag = ({ tag, index, deleteTag, email, setToDelete }) => {
  var md5 = require("md5");
  const hash = md5(email);
  const url = process.env.REACT_APP_PORTFOLIO_URL + hash + tag + ".html";
//   const url = "https://portfolio2.tricksumo.com/" + hash + tag + ".html";

  return (
    <div
      style={{
        backgroundColor: "rgb(42, 171, 231)",
        paddingTop: "3px",
        margin: "10px",
        height: "30px",
        width: "75%",
        borderRadius: "50px",

        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}
    >
      <span
        key={`${index}-${Date.now()}`}
        style={{ paddingLeft: "6px", display: "flex", float: "left" }}
      >
        {" "}
        {index + 1}. {tag}{" "}
      </span>

      <span style={{ paddingLeft: "6px", marginTop: "3px" }}>
        {" "}
        <a href={url} target="_blank" rel="noreferrer">
          View
        </a>{" "}
        <Link to = {`/edit/${tag}`}>Edit</Link>
      </span>
      <span>
        <button
          style={{
            marginRight: "19px",
            marginTop: "3px",
            display: "flex",
            float: "right",
          }}
          onClick={() => {
            setToDelete(tag);
            deleteTag(tag);
          }}
        >
          delete
        </button>
      </span>
    </div>
  );
};

export default ShowTag;
