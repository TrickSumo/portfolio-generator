import React from "react";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { MyContext } from "../App";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { InputLabel, MenuItem, Typography } from "@mui/material";
import { Select } from "@mui/material";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";

const Form2 = () => {
  const {
    
    nameProp,
    emailProp,
    eduProp,
    expProp,
    hobProp,
    thumbnailURLProp,
    locationProp,
  } = useContext(MyContext);

  

  const [name, setName] = nameProp;
  const [email, setEmail] = emailProp;
  const [thumbnailURL, setThumbnailURL] = thumbnailURLProp;
  const [location, setLocation] = locationProp;

  // Lists of Education (edu), Experince (exp) and Hobbies (hob)
  const [edu, setEdu] = eduProp;
  const [exp, setExp] = expProp;
  const [hob, setHob] = hobProp;

  // Local states
  const [countries, setCountries] = useState([]);
  const [singleCountry, setSingleCountry] = useState('');
  const [cities, setCities] = useState([]);
  const [singleCity, setSingleCity] = useState('');
  const [submit, setSubmit] = useState(true);

  const fetchCountries = async () => {
    try {
      const country = await axios.get(
        "https://countriesnow.space/api/v0.1/countries"
      );
      // console.log(country.data.data[0].cities);
      setCountries(country.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCities = (country) => {
    setSubmit(false);

    setSingleCountry(country);
    const findCities = countries.filter((c) => c.country === country);
    // console.log(findCities[0].cities);
    setCities(findCities[0].cities);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    const tmp =
      singleCity && singleCountry ? singleCity + ", " + singleCountry : "";
    setLocation(tmp);
    // navigate('/form3')

    if (singleCity && singleCountry) {
      navigate("/form3");
    } else {
      setSubmit(false);
    }
  };

  const handleSkip = () => {
    navigate("/form3");
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="form">
      <div className="form-element-top">
        <figure style={{ textSize: "10emu" }}>
          <img src={thumbnailURL} height="300px" alt="profle" />
          <figcaption>{name}</figcaption>
          <figcaption>
            {" "}
            {singleCity && singleCountry
              ? `${singleCity}, ${singleCountry} `
              : ""}
          </figcaption>
        </figure>
      </div>

      <div className="body">
        <h3>Please Select Your Location (Optional):</h3>

        {countries && (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="Country">Country</InputLabel>
            <Select
              labelId="Country"
              id="Country"
              value={singleCountry}
              MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
              onChange={(e) => fetchCities(e.target.value)}
            >
              {countries.map((country, index) => (
                <MenuItem
                  key={`${country.country}-${Date.now()}-${index}`}
                  value={country.country}
                >
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {countries && (
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="City">City</InputLabel>
            <Select
              labelId="City"
              id="City"
              value={singleCity}
              MenuProps={{ PaperProps: { sx: { maxHeight: 300 } } }}
              onChange={(e) => {setSingleCity(e.target.value); setSubmit(true);}}
            >
              {cities.map((city, index) => (
                <MenuItem value={city} key={index}>
                  {city}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
       
        {!submit && (
          <span className="error">
            {" "}
            <br />❌ Please Select Your Location.
          </span>
        )}
        <br /> <p />
        <button className="submitButton" onClick={handleSkip}>
          Skip
        </button>{" "}
        &nbsp;&nbsp;&nbsp;
        <button
          className="submitButton"
          onClick={handleSubmit}
          disabled={!submit}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Form2;
