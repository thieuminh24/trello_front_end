import { createReducer } from "@reduxjs/toolkit";

// Khởi tạo state ban đầu
const initialState = {
  isAuthenticated: false,
  user: null, // Thêm trường user để lưu thông tin người dùng
  isError: null, // Thêm trường để lưu thông tin lỗi
};

// Tạo reducer bằng builder callback notation
const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadingUserRequest", (state) => {
      state.loading = true; // Cập nhật trạng thái loading
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true; // Cập nhật trạng thái xác thực
      state.loading = false; // Đặt trạng thái loading thành false
      state.user = action.payload; // Cập nhật thông tin người dùng
    })
    .addCase("LoadUserFail", (state, action) => {
      state.isAuthenticated = false; // Cập nhật trạng thái xác thực
      state.isError = action.payload; // Lưu thông tin lỗi
      state.loading = false; // Đặt trạng thái loading thành false
    });
});

export default userReducer;
