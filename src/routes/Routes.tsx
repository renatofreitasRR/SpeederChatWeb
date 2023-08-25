import { useContext } from "react";
import { Home } from "../screens/Home";
import { Chat } from "../screens/Chat";
import { HubConnectionContext } from "../contexts/HubConnectionContext";

export function Routes() {
  const { connection } = useContext(HubConnectionContext);

  return <>{!connection ? <Home /> : <Chat />}</>;
}
