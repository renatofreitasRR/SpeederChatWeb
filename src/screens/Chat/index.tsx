import { FormEvent, useContext, useState } from "react";
import { HubConnectionContext } from "../../contexts/HubConnectionContext";
import "./styles.scss";

export function Chat() {
  const { userName, messages, sendMessage } = useContext(HubConnectionContext);
  const [message, setMessage] = useState("");

  function handleSendMessage(e: FormEvent) {
    e.preventDefault();
    sendMessage(message);
    setMessage("");
  }

  return (
    <div className="center">
      <div className="chat">
        <div className="contact bar">
          <div className="pic stark"></div>
          <div className="name">{userName}</div>
        </div>
        <div className="messages" id="chat">
          {messages.map((message, index) => (
            <div className={`message ${message.user.sended && "sended"}`} key={index}>
              {message.message}
            </div>
          ))}
        </div>
        <form className="input" onSubmit={handleSendMessage}>
          <input
            placeholder="Type your message here!"
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button>Enviar</button>
        </form>
      </div>
    </div>
  );
}
