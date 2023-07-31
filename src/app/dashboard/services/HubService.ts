import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export function setupSocketConnection(): HubConnection {
  const SOCKET_URL = process.env.NEXT_PUBLIC_CLINICS_API + '/Slack/Response';
  const connection = new HubConnectionBuilder()
    .withUrl(SOCKET_URL)
    .withAutomaticReconnect()
    .build();

  connection
    .start()
    .then(() => {
      connection.on('ReceiveMessage', Recivemessage => {
        connection.stop().then(() => {
          return null;
        });
      });
    })
    .catch(e => console.log('Connection failed: ', e));
  return connection;
}
