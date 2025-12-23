import { useState } from "react";
import axios from "axios";
import useInput from "../hooks/useInput";
function Paragraph() {
  document.title = "paragraph";
  const [topic, setTopic] = useInput("");
  const [error, setError] = useState("");
  const [parag, setParag] = useState("please enter topic in input...");
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.preventDefault();
    const config = {
      header: {
        "Content-Type": "text/plain",
      },
    };
    try {
      const data = await axios.post(
        "http://localhost:5000/api/paragraph",
        { topic },
        config
      );
      setParag(data.data);
      if (!data.data.success) setError(data.data.error);
    } catch (err) {
      setError(err.response.data.error);
      console.log(error);
    }
  };
  return (
    <div className="prg">
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
      <div className="cout">{parag}</div>
    </div>
  );
}
export default Paragraph;
