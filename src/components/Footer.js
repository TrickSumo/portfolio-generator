import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>

        
        <Link to ="/delete"><button style={{backgroundColor:"#ec552f", width:100, fontWeight:'bold'}}> Delete Your Data </button></Link>

    </div>
  )
}

export default Footer