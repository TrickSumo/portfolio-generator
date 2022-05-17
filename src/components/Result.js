import React from 'react'

const Result = ({hash, profileTag}) => {

  const domainName = process.env.REACT_APP_PORTFOLIO_URL

  const url =  domainName +hash+profileTag+".html";

    
  return (
    <div style={{border:"solid black 2px", margin:"10px",textAlign:"center"}}>
        
        <h3 style={{padding:"5px"}}>Shareable URL for your portfolio is:- </h3> <a href={url} target="_blank" rel="noreferrer">{url}</a>
    </div>
  )
}

export default Result