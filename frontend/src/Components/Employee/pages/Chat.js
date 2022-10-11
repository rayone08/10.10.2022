import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";
import "../components/css/chat.css";
import SendIcon from "@mui/icons-material/Send";
import Pusher from "pusher-js";

const Chat = () => {
  const location = useLocation();
  const { chatId, arisedBy } = location.state;
  var id = localStorage.getItem("logID");

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8400/new", {
      chatId: chatId,
      message: input,
      arisedBy: arisedBy,
      timestamp: new Date().toUTCString(),
    });
    setInput("");
  };

  useEffect(() => {
    axios.get(`http://localhost:8400/all/${chatId}`).then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    // pusher
    const pusher = new Pusher("804e94585cde1b22f4d5", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <>
      {/* <Layout> */}
      <div className="chat">
        <div className="chat_body">
          {messages.map((message) => (
            <p
              className={`chat_message ${
                id === message.arisedBy && "chat_receiver"
              }`}
            >
              {message.message}
              <span className="chat_timestamp">{message.timestamp}</span>
            </p>
          ))}
        </div>
        <div className="chat_footer">
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button onClick={sendMessage} type="submit">
              <SendIcon />
            </button>
          </form>
        </div>
      </div>
      {/* </Layout> */}
    </>
  );
};

export default Chat;
