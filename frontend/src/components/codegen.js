import { useState } from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
const Codegen = function () {
  document.title = "codegen";
  const [topic, setTopic] = useInput("");
  const [error, setError] = useState("");
  const [final, setfinal] = useState("please enter topic in input...");
  const [copied, setcopied] = useState(false);
  const [selectedOption, setSelectedOption] = useState("option0");
  const handlebc = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedOption === "option0") {
      alert("please select the language");
      return;
    }
    const config = {
      header: {
        "Content-Type": "text/plain",
      },
    };
    try {
      const data = await axios.post(
        "http://localhost:5000/api/codegen",
        { topic, language: selectedOption },
        config
      );
      setfinal(data.data.split("\n").slice(1).join("\n"));
      if (!data.data.success) setError(data.data.error);
    } catch (err) {
      setError(err.response.data.error);
      console.log(error);
    }
  };
  function handleCopy() {
    navigator.clipboard.writeText(final);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 2000);
  }
  return (
    <div className="codegen">
      <select id="selectExample" value={selectedOption} onChange={handlebc}>
        <option value="option0">Please select the language</option>
        <option value="C">C</option>
        <option value="CPP">C++</option>
        <option value="java">JAVA</option>
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="nodejs">Node.js</option>
      </select>
      <form type="submit" className="searchp" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter topic here...."
          name="topic"
          value={topic}
          onChange={setTopic}
          required
        />
        <button type="submit">search</button>
      </form>
      <div className="cout">
        <span onClick={handleCopy} className="copy">
          {copied === false ? "copy" : "copied"}
        </span>
        <pre>{final}</pre>
      </div>
    </div>
  );
};
export default Codegen;
