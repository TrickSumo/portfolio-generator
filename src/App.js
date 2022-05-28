import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Delete from "./components/Delete";
import Home from "./components/Home";
import Form2 from "./components/Form2";
import Form3 from "./components/Form3";


import Header from './components/Header';
import Footer from './components/Footer';
import EditProfile from "./components/EditProfile";


export const MyContext = createContext();

function App() {


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const[thumbnailURL,setThumbnailURL] = useState('')
  const[location,setLocation] = useState('')
  const [profileTag, setProfileTag] = useState("default");

  // Lists of Education (edu), Experince (exp) and Hobbies (hob)
  const [edu, setEdu] = useState([
    { id:1, text: "BA ABC College of Ats and Science" },
    { id:2,text: "Masters in Grass Technology, ABCD, 9.2" },
  ]);
  const [exp, setExp] = useState([
    { id:1,text: "Space Scientist at ISRO " },
    { id:2,text: "Masterchef at zoo" },
  ]);
  const [hob, setHob] = useState([
    { id:1, text: "Eating Grass" },
    {id:2, text: "Gazing Stars" },
    
  ]);

  return (
    <>
    <header><Header/></header>
    

      <MyContext.Provider
        value={{
          
          nameProp: [name, setName],
          emailProp: [email, setEmail],
          eduProp: [edu, setEdu],
          expProp: [exp, setExp],
          hobProp: [hob, setHob],
          thumbnailURLProp:[thumbnailURL,setThumbnailURL] ,
          locationProp:[location,setLocation],
          profileTagProp:[profileTag, setProfileTag]
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form2" element = {<Form2/>} />
          <Route path="/form3" element = {<Form3/>} />
          
          <Route path="/edit/:tag" element = {<EditProfile/>} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </MyContext.Provider>

      <footer className="footer">  <Footer />   </footer>
    </>
  );
}

export default App;
