import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
const boardsReducer = createReducer(initialState, (builder) => {
  builder.addCase("loadBoardsRequest", (state) => {
    state.loading = true;
  });
  builder.addCase("loadBoardSucces", (state, action) => {
    state.loading = false;
    state.boards = action.payload;
  });
  builder.addCase("loadBoardFail", (state, action) => {
    state.loading = false;
    state.isError = true;
    state.boards = action.payload;
  });
});

export default boardsReducer;
