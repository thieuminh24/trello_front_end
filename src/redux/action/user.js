import axios from "axios";
import { API_ROOT } from "../../utils/constants";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadingUserRequest" });

    const { data } = await axios.get(`${API_ROOT}/v1/user`, {
      withCredentials: true,
    });

    dispatch({ type: "LoadUserSuccess", payload: data });
  } catch (error) {
    dispatch({ type: "LoadUserFail", payload: error.response.data.message });
  }
};
