import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { API_ROOT } from "../../utils/constants";
const Active = () => {
  const navigate = useNavigate();
  const { active_token } = useParams();

  axios.post(`${API_ROOT}/v1/user/active/${active_token}`, {
    token: localStorage.getItem("token"),
  });

  return (
    <div style={{ width: "100%" }}>
      <img
        style={{
          width: "450px",
          margin: "0 auto",
          display: "block",
        }}
        src="https://png.pngtree.com/png-clipart/20211031/original/pngtree-rhino-chibi-like-png-image_6888296.png"
        alt=""
      />
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Chúc mừng bạn đã kích hoạt tài khoản thành công vui lòng quay lại để
        đăng nhập 🎉🎉
      </h1>
      <Button
        variant="contained"
        sx={{ margin: "0 auto", display: "block", paddingX: "20px" }}
        onClick={() => navigate("/login")}
      >
        Login
      </Button>
    </div>
  );
};

export default Active;
