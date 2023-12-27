import Bugsnag from '@bugsnag/js';
import { User } from '@interface/appointment';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

interface Props {
  urlConnection: string;
  onReceiveMessage(message: any): void;
  userDefined?: User | null
}

class SocketService {
  private static instances: { [url: string]: SocketService } = {};
  private static currentUrl: string | null = null;
  static userIntern: User | null | undefined;
  private constructor({ urlConnection, onReceiveMessage, userDefined}: Props) {
    this.initializeConnection(urlConnection, onReceiveMessage, userDefined);
  }

  public static getInstance({
    urlConnection,
    onReceiveMessage,
    userDefined
  }: Props): SocketService {
    if (!SocketService.instances[urlConnection]) {
      SocketService.currentUrl = urlConnection;
      SocketService.userIntern = userDefined;
      SocketService.instances[urlConnection] = new SocketService({
        urlConnection,
        onReceiveMessage,
        userDefined
      });
    }
    return SocketService.instances[urlConnection];
  }

  private initializeConnection(
    urlConnection: string,
    onReceiveMessage: Props['onReceiveMessage'],
    userDefined?: User | null
  ) {
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
          onReceiveMessage(message);
        });
      })
      .catch(e => Bugsnag.notify('Connection failed: ', e));
  }
}

export default SocketService;
