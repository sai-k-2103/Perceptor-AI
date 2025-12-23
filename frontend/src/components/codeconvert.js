import { useState } from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
const Codecon = function () {
  document.title = "codeconvert";
  const [code, setCode] = useInput("");
  const [error, setError] = useState("");
  const [ocode, setOcode] = useState(
    "please paste your code in the input space..."
  );
  const [copied, setcopied] = useState(false);
  const [selectedOptionfc, setSelectedOptionfc] = useState("option0");
  const [selectedOption, setSelectedOption] = useState("option0");

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOptionfc(selectedValue);
  };
  const handlebc = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "text/plain",
      },
    };
    try {
      if (selectedOption === "option0") {
        alert("please select the language of your code");
        return;
      }
      if (selectedOptionfc === "option0") {
        alert(
          "please select the language in which you want to convert the code"
        );
        return;
      }
      const data = await axios.post(
        "http://localhost:5000/api/codecon",
        { code: code, ilang: selectedOption, olang: selectedOptionfc },
        config
      );
      setOcode(data.data.split("\n").slice(1).join("\n"));
      if (!data.data.success) setError(data.data.error);
    } catch (err) {
      setError(err.response.data.error);
      console.log(error);
    }
  };
  function handleCopy() {
    navigator.clipboard.writeText(ocode);
    setcopied(true);
    setTimeout(() => {
      setcopied(false);
    }, 2000);
  }
  return (
    <div className="codecon">
      <h1>Code Conversoin</h1>
      <div>
        <div>
          <form action="submit" onSubmit={handleSubmit} id="ccon">
            <select
              id="selectExample"
              value={selectedOption}
              onChange={handlebc}
            >
              <option value="option0">Please select the language</option>
              <option value="option1">C</option>
              <option value="option2">C++</option>
              <option value="option3">JAVA</option>
              <option value="option4">Python</option>
              <option value="option5">JavaScript</option>
              <option value="option6">Node.js</option>
              <option value="option7">Other</option>
            </select>
            <textarea
              name="code-gen"
              id="cde"
              cols="30"
              rows="10"
              placeholder="paste your code here"
              value={code}
              onChange={setCode}
              required
            ></textarea>
            <button>convert</button>
          </form>
        </div>
        <div>
          <span onClick={handleCopy} className="copy">
            {copied === false ? "copy" : "copied"}
          </span>

          <select
            id="selectExample"
            value={selectedOptionfc}
            onChange={handleSelectChange}
          >
            <option value="option0">Please select the language</option>
            <option value="C">C</option>
            <option value="cpp">C++</option>
            <option value="java">JAVA</option>
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="nodejs">Node.js</option>
          </select>
          <p>
            <pre>{ocode}</pre>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Codecon;
