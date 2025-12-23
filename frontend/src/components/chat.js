import { useEffect, useState } from "react";
import axios from "axios";
const Chat = function () {
  document.title = "chat";
  const [ques, setQues] = useState("");
  const [error, setError] = useState("");
  const [curhrs, setHrs] = useState(new Date().getHours());
  const [curmin, setMints] = useState(new Date().getMinutes());
  const [chats, setChats] = useState(
    JSON.parse(localStorage.getItem("chats")) || []
  );
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);
  const handleClick = async () => {
    setHrs(new Date().getHours());
    setMints(new Date().getMinutes());
    const config = {
      header: {
        "Content-Type": "text/plain",
      },
    };

    try {
      axios
        .post("http://localhost:5000/api/chat", { mytxt: ques }, config)
        .then((data) => {
          const currChat = {
            user: ques,
            bot: data.data.replaceAll(/@User!/g, ""),
            ctime: `${curhrs}:${curmin}`,
          };
          setChats([...chats, currChat]);
          setQues("");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      setError(err.response);
      console.log(error);
    }
  };
  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };
  function refreshchat() {
    localStorage.removeItem("chats");
    setChats([]);
  }
  return (
    <div className="chat">
      <h2>Chat Messages</h2>
      <button className="refresh" onClick={refreshchat}>
        new chat
      </button>

      <div className="chat1">
        {chats &&
          chats.map((chat, idx) => (
            <div className="chat3" key={idx}>
              <div className="container darker">
                <span className="you">you</span>
                <p>{chat.user}</p>
                <span className="time-left">{chat.ctime}</span>
              </div>
              <div className="container lighter">
                <span className="bot">bot</span>
                <p>{chat.bot}</p>
                <span className="time-left">{chat.ctime}</span>
              </div>
            </div>
          ))}
      </div>

      <div className="Sendmsg">
        <input
          type="text"
          placeholder="enter text here"
          onKeyPress={handleKeyPress}
          id="in1"
          value={ques}
          onChange={(e) => setQues(e.target.value)}
        />
        <button onClick={handleClick}>send</button>
      </div>
    </div>
  );
};
export default Chat;
