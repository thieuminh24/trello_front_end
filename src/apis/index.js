import axios from "axios";
import { API_ROOT } from "../utils/constants";

//Lấy user
export const fetchUserApi = async () => {
  const response = await axios.get(`${API_ROOT}/v1/user`, {
    withCredentials: true,
  });
  return response.data;
};

// Tạo board
export const createBoard = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/boards`, data, {
    withCredentials: true,
  });
  return response.data;
};

// Lấy ra board
export const fetchBoardDetailApi = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
  return response.data;
};

export const fetchAllBoardApi = async (userId, limit = 10, page = 1) => {
  const response = await axios.get(
    `${API_ROOT}/v1/boards/getAllBoard/${userId}?page=${page}&limit=${limit}`,
    { withCredentials: true }
  );
  return response.data;
};

export const searchBoard = async (query, userId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/search`, {
    params: { query, userId },
    withCredentials: true,
  });
  return response.data;
};

export const fetchCardDetail = async (cardId) => {
  const response = await axios.get(`${API_ROOT}/v1/cards/${cardId}`, {
    withCredentials: true,
  });
  return response.data;
};

export const updateCard = async (cardId, cardData) => {
  const response = await axios.put(`${API_ROOT}/v1/cards/${cardId}`, cardData, {
    withCredentials: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// thêm một cột mới
export const createNewColumnAPI = async (newColumData) => {
  const response = await axios.post(`${API_ROOT}/v1/columns/`, newColumData);
  return response.data;
};

// thêm một thẻ mới
export const createNewCardAPI = async (newCardData) => {
  const response = await axios.post(`${API_ROOT}/v1/cards/`, newCardData);
  return response.data;
};

export const updateBoardDetailsApi = async (boardId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/${boardId}`,
    updateData
  );
  return response.data;
};

export const moveCardToDifferentColumnAPI = async (updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/boards/supports/moving_cards`,
    updateData
  );
  return response.data;
};

export const updateColumnDetailsApi = async (columnId, updateData) => {
  const response = await axios.put(
    `${API_ROOT}/v1/columns/${columnId}`,
    updateData
  );
  return response.data;
};

export const deleteColumnDetailsApi = async (columnId) => {
  const response = await axios.delete(`${API_ROOT}/v1/columns/${columnId}`);
  return response.data;
};

// comment
export const createComment = async (data) => {
  const response = await axios.post(`${API_ROOT}/v1/comments`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchAllComment = async (cardId) => {
  const response = await axios.get(`${API_ROOT}/v1/comments/${cardId}`, {
    withCredentials: true,
  });
  return response.data;
};
