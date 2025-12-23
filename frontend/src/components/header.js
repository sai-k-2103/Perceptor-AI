import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
function Header() {
  const [login, toggleLogin] = useToggle(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  const handleClick = () => {
    if (login) {
      toggleLogin();
      localStorage.removeItem("authToken");
      localStorage.removeItem("chats");
      navigate("/sign-in");
    } else {
      navigate("/sign-in");
    }
  };
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/chat">chat</Link>
      <Link to="/codeconverter">Code Converter</Link>
      <Link to="/paragraph">Paragraph Generator</Link>
      <Link to="/codegenerator">Code Generator</Link>
      <button onClick={handleClick} className="logout">
        {login ? "Logout" : "Login"}
      </button>
    </div>
  );
}
export default Header;
