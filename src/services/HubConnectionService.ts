import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export class HubConnectionService {
  private url: string;

  constructor() {
    this.url = "http://localhost:7194/chat";
  }

  getConnection(): HubConnection {
    const connection = new HubConnectionBuilder()
      .withUrl(this.url)
      .configureLogging(LogLevel.Information)
      .build();

    return connection;
  }
}
