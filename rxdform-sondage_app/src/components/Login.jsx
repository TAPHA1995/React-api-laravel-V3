import React, { useState, useEffect } from "react";
import img from "../assets/contact.svg";
import Heading from "../layout/Heading";
import Button from "../layout/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../isAuthenticated/isAuthenticated";



const Login = (props) => {



  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getUserDetails = async (token) => {
    try {
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails de l'utilisateur : ",
        error.response.data
      );
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        formData
      );

      if (response && response.data) {
        setSuccessMessage("Connexion réussie !");
        const token = response.data.token;
        const userName = response.data.username;

        localStorage.setItem("token", token);
        localStorage.setItem("username", userName);

        if (isAuthenticated()) {
          navigate("/sondages");
        } else {
          console.error("Erreur lors de l'authentification");
        }
      } else {
        console.error("Réponse inattendue de la requête");
      }
    } catch (error) {
      setErrorMessage("Identifiants invalides");
      console.error("Erreur lors de la connexion : ", error.response.data);
    }
  };

 
  // const navigate =  useNavigate();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });

  // const [errorMessage, setErrorMessage] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");


  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };



  // const getUserDetails = async (token) => {
  //   try {
  //     const response = await axios.get("http://localhost:8000/api/user", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     return response.data;
  //   } catch (error) {
  //     console.error(
  //       "Erreur lors de la récupération des détails de l'utilisateur : ",
  //       error.response.data
  //     );
  //     throw error;
  //   }
  // };



  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8000/api/login",
  //       formData
  //     );
  //     console.log(response);
  //     if (response && response.data) {
  //       setSuccessMessage("Connexion réussie !");
  //       const token = response.data.token;
  //       const userName = response.data.username; // Assurez-vous que votre API renvoie le nom d'utilisateur

  //       localStorage.setItem("token", token);
  //       localStorage.setItem("username", userName);

  //       // Redirigez l'utilisateur vers la page de création de sondage
  //       if (isAuthenticated()) {
  //         console.log(token)
  //         localStorage.setItem("user_token", token);
  //         navigate("/sondages");
  //       } else {
  //         console.error("Erreur lors de l'authentification");
  //       }
  //     } else {
  //       // Gérer le cas où response ou response.data est undefined
  //       console.error("Réponse inattendue de la requête");
  //     }
  //   } catch (error) {
  //     setErrorMessage("Identifiants invalides");
  //     console.error("Erreur lors de la connexion : ", error.response.data);
  //   }
  // };
  return (
    <div>
    <Navbar />
    
    <div className="min-h-screen flex flex-col items-center justify-center md:mx-32 mx-5 mt-10">
      <Heading title1="Créer un compte" />
      <div className="flex flex-col md:flex-row justify-between w-full">
        <form
          className="w-full md:w-2/5 login space-y-5 pt-20"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
              onChange={handleInputChange}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className=" py-3 px-2 rounded-lg hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-all"
              onChange={handleInputChange}
              type="password"
              placeholder="**************"
              id="password"
              name="password"
              required
            />
          </div>
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-3">
              {errorMessage}
            </div>
          )}
          {/* <button
            className="link-btn"
            onClick={() => props.onFormSwitch("register")}
          > */}
          <Link to="/Register">
              Didn't have an account? Register.
          </Link>
          
          {/* </button> */}
          <div className="flex flex-row justify-start">
            <Button type="submit" title="Log In" />
          </div>
        </form>
        <div className="w-full md:w-2/4">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Login;
