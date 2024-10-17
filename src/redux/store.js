import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk"; // Import redux-thunk
import userReducer from "./reduce/user"; // Adjust the import path
import boardsReducer from "./reduce/boards";
import socketReducer from "./reduce/socket";

const Store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Add redux-thunk middleware
});

export default Store;
