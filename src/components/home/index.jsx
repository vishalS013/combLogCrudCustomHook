import React from "react";
import { useAuth } from "../../contexts/authContext";
import TodoList from "../todolist";
import { Typography } from "@mui/material";
import { doSignOut } from "../../firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import Fetch from "../../Fetch";

const Home = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  

  console.log(currentUser, "-=-=-=-=-=-=-=-=>");

  return (
    <>
      <div className="outerContainer">
        <div className="header fixed top-0 left-[250px] right-0  bg-customColor h-[100px] text-white text-2xl flex items-center justify-center z-50 ">
          <Typography variant="h3">Home Page</Typography>
          <div className=" justify-end text-right w-[50%] ml-96">
            <Typography variant="h5" className="font-bold">{currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}</Typography>
              
      {currentUser ? (
        <>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="text-lg text-white underline ml-2"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="text-lg text-white underline" to={"/login"}>
            Login
          </Link>
          <Link className="text-lg text-white underline" to={"/register"}>
            Register New Account
          </Link>
        </>
      )}
    
          </div>

           </div>
        <div className="sideNav bg-oneLine  fixed top-0 left-0 w-[250px] h-[100vh] text-white text-2xl flex items-center justify-center z-50"> 

        <Typography variant="h3">Side Nav</Typography>
        </div>
        <div className="bg-gray-700 mt-[100px] relative left-[250px] right-0 !min-h-[100vh] z-40 ">
          <div className="text-2xl font-bold p-10 text-center ">
           <p className="text-white text-xl">
           Hello{" "}
        <span>    {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
              </span>
            , you are now logged in.
           </p>
          </div>
          <TodoList />
          <Fetch/>
        
          
        </div>
      </div>
    </>
  );
};

export default Home;
