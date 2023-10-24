import Bugsnag from '@bugsnag/js';
import { HttpTransportType, HubConnectionBuilder } from '@microsoft/signalr';

interface Props {
  urlConnection: string;
  onReceiveMessage(message: string): void;
}

class SocketService {
  private static instances: { [url: string]: SocketService } = {};
  private static currentUrl: string | null = null;

  private constructor({ urlConnection, onReceiveMessage }: Props) {
    this.initializeConnection(urlConnection, onReceiveMessage);
  }

  public static getInstance({
    urlConnection,
    onReceiveMessage,
  }: Props): SocketService {
    if (!SocketService.instances[urlConnection]) {
      SocketService.currentUrl = urlConnection;
      SocketService.instances[urlConnection] = new SocketService({
        urlConnection,
        onReceiveMessage,
      });
    }
    return SocketService.instances[urlConnection];
  }

  private initializeConnection(
    urlConnection: string,
    onReceiveMessage: Props['onReceiveMessage']
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
          const finalMessage = message.messageText;
          if (finalMessage) {
            if (finalMessage.startsWith('[PatientArrived]')) {
              onReceiveMessage(finalMessage);
            } else if (finalMessage.startsWith('[PaymentResponse]')) {
              onReceiveMessage(finalMessage);
            }
          } else {
            onReceiveMessage(message);
          }
        });
      })
      .catch(e => Bugsnag.notify('Connection failed: ', e));
  }
}

export default SocketService;
