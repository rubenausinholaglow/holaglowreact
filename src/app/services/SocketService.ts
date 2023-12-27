import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

interface Props {
  urlConnection: string;
  onReceiveMessage(message: any, userData: User): void;
  userData? : User;
  }

class SocketService {
  private static instances: { [url: string]: SocketService } = {};
  private static currentUrl: string | null = null;
  private static currentUser: User | null = null;
  private constructor({ urlConnection, onReceiveMessage, userData }: Props) {
    this.initializeConnection(urlConnection, onReceiveMessage, userData);
  }

  public static getInstance({
    urlConnection,
    onReceiveMessage,
    userData,
  }: Props): SocketService {
    if (!SocketService.instances[urlConnection]) {
      SocketService.currentUrl = urlConnection;
      SocketService.currentUser = userData!;
      SocketService.instances[urlConnection] = new SocketService({
        urlConnection,
        onReceiveMessage,
      });
    }
    return SocketService.instances[urlConnection];
  }

  private initializeConnection(
    urlConnection: string,
    onReceiveMessage: Props['onReceiveMessage'],
    userData? : User
  ) {
    console.log("userData; " + JSON.stringify(userData))
    console.log("url; " + urlConnection)
    const newConnection = new HubConnectionBuilder()
      .withUrl(urlConnection, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        newConnection.on('ReceiveMessage', message => {
          console.log("DATA .->. " + userData)
          onReceiveMessage(message, userData!);
        });
      })
      .catch(e => Bugsnag.notify('Connection failed: ', e));
  }
}

export default SocketService;
