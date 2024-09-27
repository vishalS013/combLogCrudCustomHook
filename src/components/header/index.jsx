import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { Button, Typography } from "@mui/material";
import useCounter from "../../contexts/authContext/UseCounter";

const Header = () => {
  // const {decrement,count,increment,reset} =useCounter(20);
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();
  return (
    <nav className="flex justify-center items-center flex-row gap-x-2 w-full z-50 fixed bottom-0 left-[250px] h-12  bg-gray-700">
      {userLoggedIn ? (
        <>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className=" flex text-lg text-white underline"
          >
            Logout
          </button>
          {/* <div className='space-x-2'>
        <Typography variant='h3' className='text-white text-lg'>Using Custom Hooks Example </Typography>
            <Typography variant='h2' className='text-white text-lg'>Count: {count}</Typography>
            <Button onClick={increment} variant='outlined' className='text-white'>Increment</Button>
            <Button onClick={decrement} variant='outlined'>Decrement</Button>
            <Button onClick={reset} variant='contained'>Reset</Button>
        </div> */}
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
    </nav>
  );
};

export default Header;
