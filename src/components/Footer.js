import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
     
     <span style={{float:'left'}}>Version:1.3.6.9</span>
        
        <Link to ="/delete"><button style={{backgroundColor:"#ec552f", width:100, fontWeight:'bold'}}> Delete Your Data </button></Link>

    </div>
  )
}

export default Footer
