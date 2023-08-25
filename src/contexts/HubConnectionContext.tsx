import { HubConnection } from "@microsoft/signalr";
import { ReactNode, createContext, useState } from "react";
import { HubConnectionService } from "../services/HubConnectionService";
import { IUser } from "../interfaces/IUser";
import { IMessage } from "../interfaces/IMessage";

interface IHubConnectionContext {
  rooms: string[];
  messages: IMessage[];
  userName: string;
  connection: HubConnection | undefined;
  getRooms: () => void;
  joinRoom: (userName: string, room: string) => void;
  sendMessage: (message: string) => Promise<void>;
}

export const HubConnectionContext = createContext({} as IHubConnectionContext);

interface HubConnectionProviderProps {
  children: ReactNode;
}

export function HubConnectionProvider({
  children,
}: HubConnectionProviderProps) {
  const [connection, setConnection] = useState<HubConnection>();
  const [userName, setUserName] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);

  async function joinRoom(userName: string, room: string) {
    try {
      const hubConnectionService = new HubConnectionService();
      const hubConnection = hubConnectionService.getConnection();

      watchMessages(hubConnection);

      await hubConnection.start();
      await hubConnection.invoke("JoinRoom", { userName, room, id: "" });

      setUserName(userName);
      setConnection(hubConnection);
    } catch (e: unknown) {
      console.log("Error on try join room", e);
    }
  }

  async function sendMessage(message: string) {
    try {
      await connection?.invoke("SendMessage", message);
    } catch (e: unknown) {
      console.log("Error on try Send Message", e);
    }
  }

  async function getRooms() {
    const hubConnectionService = new HubConnectionService();
    const hubConnection = hubConnectionService.getConnection();

    hubConnection?.on("RoomsAvailable", (rooms) => {
      setRooms(rooms);
    });

    await hubConnection?.start();
    await hubConnection?.invoke("SendGroups");
  }

  function watchMessages(hubConnection: HubConnection) {
    hubConnection.on("receivedmessage", (sender: IUser, message) => {
      if (sender.id === hubConnection.connectionId) {
        console.log("Sender", sender.id);

        sender.sended = true;

        setMessages((prevMessages) => [
          ...prevMessages,
          { user: sender, message: message },
        ]);
      } else {
        sender.sended = false;

        setMessages((prevMessages) => [
          ...prevMessages,
          { user: sender, message: message },
        ]);
      }
    });
  }

  return (
    <HubConnectionContext.Provider
      value={{
        connection,
        userName,
        messages,
        rooms,
        sendMessage,
        joinRoom,
        getRooms,
      }}
    >
      {children}
    </HubConnectionContext.Provider>
  );
}
