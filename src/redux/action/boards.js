import axios from "axios";
import { API_ROOT } from "../../utils/constants";

const loadBoards = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "loadBoardsRequest",
    });
    const { data } = await axios.get(
      `${API_ROOT}/v1/boards/getAllBoard/${userId}?page=1&limit=10`,
      { withCredentials: true }
    );
    dispatch({
      type: "loadBoardSucces",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "loadBoardFail",
      payload: error.response.data.message,
    });
  }
};

export default loadBoards;
