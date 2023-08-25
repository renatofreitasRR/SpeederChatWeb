import { HubConnectionProvider } from "./contexts/HubConnectionContext";
import { Routes } from "./routes/Routes";

function App() {
  return (
    <HubConnectionProvider>
      <Routes />
    </HubConnectionProvider>
  );
}

export default App;
