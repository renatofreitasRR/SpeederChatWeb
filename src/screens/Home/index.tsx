import { FormEvent, useContext, useEffect, useState } from "react";
import "./styles.scss";
import { HubConnectionContext } from "../../contexts/HubConnectionContext";

export function Home() {
  const { joinRoom, rooms, getRooms } = useContext(HubConnectionContext);
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");

  function handleJoinRoom(e: FormEvent) {
    e.preventDefault();
    joinRoom(userName, room);
  }

  useEffect(() => {
    getRooms();
  }, []);

  return (
    <div className="home">
      <div className="contacts">
        <h2>Grupos</h2>
        {rooms.map((room, index) => (
          <div className="contact" key={index}>
            <div className="pic"></div>
            <div className="name">{room}</div>
          </div>
        ))}
      </div>
      <div className="chat">
        <div className="contact bar"></div>
        <div className="form" id="chat">
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite seu nome"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Crie uma sala"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button>Entrar</button>
          </form>
        </div>
        <div className="input"></div>
      </div>
    </div>
  );
}
