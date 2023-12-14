export interface CrisalixUserList {
  crisalixUser: CrisalixUser[];
}

export interface CrisalixUser {
  playerId: string;
  playerToken: string;
  id: string;
  name: string;
}

export interface CrisalixActions {
  addCrisalixUser: (Item: CrisalixUser) => void;
  removeCrisalixUser: (Item: CrisalixUser) => void;
}

export const INITIAL_STATE_CRISALIXUSERLIST: CrisalixUserList = {
  crisalixUser: [],
};
