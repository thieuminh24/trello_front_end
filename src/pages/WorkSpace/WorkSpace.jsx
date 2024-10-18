import AppBar from "../../components/AppBar/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FaFlipboard } from "react-icons/fa6";
import { LuActivity } from "react-icons/lu";
import Typography from "@mui/material/Typography";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TextField, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { CirclePicker } from "react-color";
import { backGrImageData } from "../../apis/mock-data";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { createBoard } from "../../apis";
import loadBoards from "../../redux/action/boards";
import { useDispatch } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";

const Attach = ({ setIsOpenModalCreateBoard, setGetBoard }) => {
  // const [inputValue, setInputValue] = useState('');
  // const [error, setError] = useState(false);
  // const [helperText, setHelperText] = useState('');
  const navigate = useNavigate();
  const [color, setColor] = useState();
  const [bgImage, setBgImage] = useState("");
  const [title, setTitle] = useState("");

  const userId = localStorage.getItem("userId");
  const onChangeBoardTitle = (e) => {
    setTitle(e.target.value);
  };

  const onClickSave = async () => {
    const data = {
      userId: userId,
      title: title,
      backgroundColor: color,
      backgroundImage: bgImage,
    };
    const response = await createBoard(data);
    setGetBoard((pre) => [...pre, response]);
    navigate(`/board/${response._id}`);
    window.location.reload();
  };
  return (
    <Box
      sx={{
        position: "absolute",
        right: "-332px",
        top: "-132px",
        minWidth: "300px",
        // height: "400px",
        backgroundColor: "#eee",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <IconButton
        aria-label=""
        style={{ position: "absolute", right: "12px", top: "12px" }}
        onClick={() => {
          setIsOpenModalCreateBoard(false);
        }}
      >
        <IoMdClose />
      </IconButton>
      <Typography
        variant="body1"
        color="initial"
        sx={{ fontWeight: "600", marginBottom: "12px" }}
      >
        Create board
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingY: "12px",
          backgroundColor: color ? `${color}` : "transparent",
          backgroundImage: bgImage ? `url(${bgImage})` : "none",
          backgroundSize: "cover",
          marginBottom: "12px",
        }}
      >
        <img src="https://trello.com/assets/14cda5dc635d1f13bc48.svg" alt="" />
      </Box>
      <Box>
        <Typography
          variant="body1"
          color="initial"
          textAlign="left"
          fontWeight="600"
          marginBottom="12px"
        >
          Background Color
        </Typography>
        <CirclePicker
          circleSpacing={8}
          style={{ marginLeft: 20 }}
          colors={[
            "#f44336",
            "#e91e63",
            "#9c27b0",
            "#3f51b5",
            "#2196f3",
            "#03a9f4",
            "#00bcd4",
            "#009688",
            "#4caf50",
            "#8bc34a",
            "#cddc39",
            "#ffeb3b",
            "#ffc107",
            "#ff9800",
          ]}
          // color={hex}
          onChange={(color) => {
            setColor(color.hex);
            setBgImage("");
          }}
        />
      </Box>

      <Box height="100%">
        <Typography
          variant="body1"
          color="initial"
          textAlign="left"
          fontWeight="600"
          marginBottom="12px"
        >
          Background Image
        </Typography>
        <ImageList sx={{ maxWidth: "300px" }} cols={3} gap={10}>
          {backGrImageData.map((item) => (
            <ImageListItem
              onClick={() => {
                setColor("");
                setBgImage(item.img);
              }}
              key={item.id}
              sx={{
                objectFit: "cover",
                mb: 2,
                cursor: "pointer",
                "&:hover .MuiImageListItemBar-root": {
                  visibility: "unset", // Hiện bar khi hover
                },
              }}
            >
              <img src={item.img} alt={item.title} loading="lazy" />
            </ImageListItem>
          ))}
        </ImageList>
        <Box display="flex" sx={{ flexDirection: "column" }}>
          <Typography
            variant="body1"
            color="initial"
            textAlign="left"
            fontWeight="600"
            marginBottom="12px"
          >
            Board Title
          </Typography>
          <TextField
            value={title}
            onChange={onChangeBoardTitle}
            // error={error} // Hiển thị trạng thái lỗi nếu có
            // helperText={helperText} // Hiển thị thông báo lỗi hoặc hướng dẫn
            sx={{
              "& .MuiInputBase-root .MuiOutlinedInput-input": {
                paddingY: "8px",
              },
            }}
          />
        </Box>
        <Button
          fullWidth
          sx={{ marginTop: "12px", color: "#333", backgroundColor: "gray" }}
          onClick={onClickSave}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

const WorkSpace = () => {
  const userId = localStorage.getItem("userId");
  // const { user } = useSelector((state) => state.user);
  const [getBoard, setGetBoard] = useState([]); // Khởi tạo state
  const { boards, loading } = useSelector((state) => state.boards);
  const navigte = useNavigate();
    const dispatch = useDispatch();
  const [isOpenModalCreateBoard, setIsOpenModalCreateBoard] = useState(false);

  console.log(getBoard);
  // Dùng useEffect để cập nhật getBoard khi loading là false
  useEffect(() => {
  
    if (loading === false) {
      setGetBoard(boards); // Cập nhật getBoard với dữ liệu từ Redux
    }
  }, [loading, boards, getBoard]); // Phụ thuộc vào loading và boards

  useEffect(() => {
      dispatch(loadUser());
    dispatch(loadBoards(userId));
  }, []);

  return (
    <>
      <AppBar></AppBar>
      <Container maxWidth="lg" sx={{ marginY: "50px" }}>
        {" "}
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <Box display="" mx="" my="" sx="">
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#758694",
                  paddingY: "10px",
                  paddingX: "20px",
                  width: "70%",
                }}
                variant="text"
                startIcon={<DashboardIcon />}
              >
                Boards
              </Button>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#758694",
                  paddingY: "10px",
                  paddingX: "20px",
                  width: "70%",
                }}
                fullWidth
                variant="text"
                startIcon={<FaFlipboard />}
              >
                Templates
              </Button>
              <Button
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  color: "#758694",
                  paddingY: "10px",
                  paddingX: "20px",
                  width: "70%",
                }}
                fullWidth
                variant="text"
                startIcon={<LuActivity />}
              >
                Home
              </Button>
            </Box>
          </Grid>

          <Grid item xs={8}>
            {getBoard?.JoinedBoard?.length >= 1 && (
              <Box display="" mx="" my="" sx="">
                <Typography
                  variant="h1"
                  color="initial"
                  sx={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#758694",
                    marginBottom: "32px",
                  }}
                >
                  Joined Boards
                </Typography>
                <Grid container spacing={0}>
                  {getBoard?.JoinedBoard?.map((board) => (
                    <Grid
                      key={board._id}
                      item
                      lg={4}
                      xs={12}
                      md={6}
                      sx={{ marginBottom: "12px" }}
                    >
                      <Box
                        onClick={() => {
                          navigte(`/board/${board._id}`);
                        }}
                        sx={{
                          borderRadius: "10px",
                          marginRight: "12px",
                          position: "relative",
                          cursor: "pointer",
                          backgroundSize: "cover",
                          height: "160px",
                          // backgroundImage: `url("${board.backgroundImage}")`,
                          backgroundImage:
                            board.backgroundImage !== ""
                              ? `url("${board.backgroundImage}")`
                              : "none",
                          backgroundColor:
                            board.backgroundColor !== ""
                              ? board.backgroundColor
                              : "transparent",
                          overflow: "hidden",
                          "&:hover > div": {
                            right: "12px",
                          },
                        }}
                      >
                        <Typography
                          variant="body1"
                          color="white"
                          sx={{
                            position: "absolute",
                            fontWeight: "700",
                            padding: "12px",
                            fontSize: "20px",
                          }}
                        >
                          {board.title}
                        </Typography>
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "2px",
                            right: "-22px",
                            transition: "right 0.3s",
                          }}
                        >
                          <StarBorderIcon sx={{ color: "white" }} />
                        </Box>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            <Box display="" mx="" my="" sx="">
              <Typography
                variant="h1"
                color="initial"
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#758694",
                  marginBottom: "32px",
                }}
              >
                YOUR WORKSPACES
              </Typography>
              <Grid container spacing={0}>
                {getBoard?.Myboard?.map((board) => (
                  <Grid
                    key={board._id}
                    item
                    lg={4}
                    xs={12}
                    md={6}
                    sx={{ marginBottom: "12px" }}
                  >
                    <Box
                      onClick={() => {
                        navigte(`/board/${board._id}`);
                      }}
                      sx={{
                        borderRadius: "10px",
                        marginRight: "12px",
                        position: "relative",
                        cursor: "pointer",
                        backgroundSize: "cover",
                        height: "160px",
                        // backgroundImage: `url("${board.backgroundImage}")`,
                        backgroundImage:
                          board.backgroundImage !== ""
                            ? `url("${board.backgroundImage}")`
                            : "none",
                        backgroundColor:
                          board.backgroundColor !== ""
                            ? board.backgroundColor
                            : "transparent",
                        overflow: "hidden",
                        "&:hover > div": {
                          right: "12px",
                        },
                      }}
                    >
                      <Typography
                        variant="body1"
                        color="white"
                        sx={{
                          position: "absolute",
                          fontWeight: "700",
                          padding: "12px",
                          fontSize: "20px",
                        }}
                      >
                        {board.title}
                      </Typography>
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: "2px",
                          right: "-22px",
                          transition: "right 0.3s",
                        }}
                      >
                        <StarBorderIcon sx={{ color: "white" }} />
                      </Box>
                    </Box>
                  </Grid>
                ))}
                <Grid item lg={4} sx={12} md={6}>
                  <Box
                    onClick={() => setIsOpenModalCreateBoard(true)}
                    sx={{
                      borderRadius: "10px",
                      marginRight: "12px",
                      backgroundColor: "#eee",
                      position: "relative",
                      cursor: "pointer",
                      height: "160px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#333",
                      "&:hover": {
                        backgroundColor: "#758694",
                      },
                    }}
                  >
                    Create new Board
                  </Box>
                  {isOpenModalCreateBoard && (
                    <Box
                      sx={{
                        position: "sticky",
                      }}
                    >
                      <Attach
                        setGetBoard={setGetBoard}
                        setIsOpenModalCreateBoard={setIsOpenModalCreateBoard}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default WorkSpace;
