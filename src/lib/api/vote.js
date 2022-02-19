import { api } from '../axios';

export const voteToPieceApi = (pieceId) => {
  return api.post(`/vote/${pieceId}`);
};

export const deVoteToPieceApi = (pieceId) => {
  return api.delete(`/vote/${pieceId}`);
};
