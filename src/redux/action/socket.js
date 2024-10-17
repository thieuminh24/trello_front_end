import { io } from "socket.io-client";

export const intitialSocket = () => (dispatch) => {
  const socket = io("http://localhost:8017");
  dispatch({
    type: "setSocket",
    payload: socket,
  });
};
