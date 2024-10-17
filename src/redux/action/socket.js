import { io } from "socket.io-client";

export const intitialSocket = () => (dispatch) => {
  const socket = io("https://trello-api-wulx.onrender.com");
  dispatch({
    type: "setSocket",
    payload: socket,
  });
};
