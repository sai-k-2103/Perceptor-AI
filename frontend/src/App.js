import "./App.css";
import Home from "./components/Home.js";
import Header from "./components/header.js";
import { Route, Routes } from "react-router-dom";
import Chat from "./components/chat.js";
import Paragraph from "./components/paragraph";
import Codegen from "./components/codegen";
import Codecon from "./components/codeconvert";
import Login from "./components/sign-in";
import Register from "./components/register";
import PrivateRoute from "./components/protected";
import Error from "./components/Error";

function App() {
  return (
    <div className="App">
      <Header />
      <header className="App-header">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/chat" element={<Chat />} />
            <Route exact path="/paragraph" element={<Paragraph />} />
            <Route exact path="/codegenerator" element={<Codegen />} />
            <Route exact path="/codeconverter" element={<Codecon />} />
          </Route>
          <Route exact path="/sign-in" element={<Login />} />
          <Route exact path="/sign-up" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
