export interface MessageSocketList {
  messageSocket: MessageSocket[];
}

export interface MessageSocket {
  messageType: MessageType;
  message: string;
}

export enum MessageType {
  None,
  PatientArrived,
  ChatResponse,
  PaymentResponse,
}

export interface MessageSocketActions {
  addMessageSocket: (Item: MessageSocket) => void;
  removeMessageSocket: (Item: MessageSocket) => void;
}

export const INITIAL_STATE_MESSAGESOCKET: MessageSocket = {
  messageType: MessageType.None,
  message: '',
};

export const INITIAL_STATE_MESSAGESOCKETLIST: MessageSocketList = {
  messageSocket: [],
};
