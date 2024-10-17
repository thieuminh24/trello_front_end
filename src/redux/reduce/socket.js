import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
};

const socketReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("setSocket", (state, action) => {
      state.socket = action.payload;
    })
    .addCase("disconnectSocket", (state) => {
      if (state.socket) {
        state.socket.disconnect();
      }
      state.socket = null;
    });
});

export default socketReducer;
