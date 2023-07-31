import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from '@microsoft/signalr';

class HubService {
  private readonly connection: HubConnection;

  constructor(socketUrl: string) {
    this.connection = new HubConnectionBuilder()
      .withUrl(socketUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    this.startConnection();
  }

  private async startConnection() {
    try {
      await this.connection.start();
    } catch (error) {
      console.log('Connection failed: ', error);
    }
  }

  public isConnected(): boolean {
    return this.connection.state === HubConnectionState.Connected;
  }

  public getConnection(): HubConnection {
    return this.connection;
  }
}

export default HubService;

