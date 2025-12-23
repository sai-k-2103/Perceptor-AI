import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { BiErrorCircle } from "react-icons/bi";

const StyledDiv = styled.div`
  width: 100%;
  min-height: 80%;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  .error {
    background: white;
    padding: 10px 20px;
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 3px 5px rgb(0, 0, 0, 0.2);
    text-align: center;
    color: red;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.2s ease all;
    height: ${({ err }) => (err ? "auto" : "0")};

    transform: ${({ err }) => (err ? "scale(1)" : "scale(0)")};
  }
  .icons {
    width: 30px;
    height: 30px;
  }
  .card {
    width: 500px;
    max-width: 100%;
    display: flex;
    box-shadow: 0 3px 5px rgb(0, 0, 0.8, 0.8);
    border-radius: 20px;
    form {
      width: 100%;
      background: teal;
      padding: 20px 40px;
      border-radius: 20px 20px 20px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      h1 {
        text-align: center;
        border-bottom: 1px solid teal;
        padding-bottom: 5px;
      }
      .label {
        display: flex;
        align-items: center;
        gap: 10px;
        .icons {
          width: 30px;
          height: 30px;
        }
      }
      input {
        padding: 10px 15px;
        border-radius: 2px;
        border: none;
        outline: none;
        transition: 0.3s ease all;

        &:hover {
          box-shadow: 0 1px 0 teal;
        }
      }
      button {
        margin: 0 auto;
        padding: 10px 25px;
        border: none;
        outline: none;
        background: teal;
        color: white;
        border-radius: 30px;
        box-shadow: 0 3px 5px rgb(0, 0, 0, 0.2);
        transition: 0.3s ease all;

        &:hover {
          transform: scale(1.1);
        }
        &:active {
          transform: scale(0.9);
        }
      }
      a {
        color: brown;
        transition: 0.3s ease all;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .card {
      flex-direction: column;
      flex-grow: 1;
      #sidebar {
        border-radius: 20px 20px 0 0;
      }
      form {
        border-radius: 0 0 20px 20px;
      }
    }
  }
`;

function Register() {
  document.title = "Register";
  const [email, handleEmail] = useInput("");
  const [password, handlePassword] = useInput("");
  const [username, handleUsername] = useInput("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) navigate("/");
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://localhost:5000/api/sign-up",
        { username, email, password },
        config
      );
      if (!res.data.success) setError(res.data.error);
      else {
        localStorage.setItem("authToken", res.data.token);
        navigate("/");
      }
    } catch (err) {
      if (err.response && err.response.data) setError(err.response.data.error);
      else setError("couldn't connect to server");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <StyledDiv err={error !== ""}>
      {error && (
        <div className="error">
          <BiErrorCircle className="icons" />
          {error}
        </div>
      )}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>

          <div className=" label">
            <FaUserCircle className="icons" />
            <label htmlFor="username">Username</label>
          </div>
          <input
            type="text"
            placeholder="Enter the username here...."
            name="username"
            value={username}
            onChange={handleUsername}
            required
          />
          <div className=" label">
            <MdEmail className="icons" />
            <label htmlFor="email">Email</label>
          </div>
          <input
            type="email"
            placeholder="Enter the email here...."
            name="email"
            value={email}
            onChange={handleEmail}
            required
          />
          <div className=" label">
            <RiLockPasswordFill className="icons" />
            <label htmlFor="password">Password </label>
          </div>
          <input
            type="password"
            placeholder="Enter the password here...."
            name="password"
            value={password}
            onChange={handlePassword}
            required
          />
          <button>Register</button>
          <h3>
            Already have an account? <Link to="/sign-in">Login</Link>{" "}
          </h3>
        </form>
      </div>
    </StyledDiv>
  );
}

export default Register;
