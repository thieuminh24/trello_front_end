// Broad Detail

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FiActivity } from "react-icons/fi";
import { Grid, Avatar, IconButton } from "@mui/material";
import AppBar from "../../components/AppBar/AppBar";
import BroadBar from "./BroadBar/BroadBar";
import BroadContent from "./BroadContent/BroadContent";
import { FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { useQuery } from "react-query";
import { FaArrowRightLong, FaRegCreditCard } from "react-icons/fa6";
import { GrTextAlignFull } from "react-icons/gr";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  MdContentCopy,
  MdOutlineDashboardCustomize,
  MdOutlineRemoveRedEye,
} from "react-icons/md";
import {
  IoPersonAddOutline,
  IoPricetagsOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { MdOutlinePerson2 } from "react-icons/md";
import { ImAttachment } from "react-icons/im";
import { useEffect, useState } from "react";
import {
  createNewColumnAPI,
  fetchBoardDetailApi,
  createNewCardAPI,
  updateBoardDetailsApi,
  updateColumnDetailsApi,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailsApi,
  fetchCardDetail,
  updateCard,
  createComment,
  fetchAllComment,
} from "../../apis";
import { IoMdClose } from "react-icons/io";
import { isEmpty } from "lodash";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";
// vì card placeholder chỉ được thêm khi một column đang có sẵn 1 card nên khi thêm một cột mới rỗng và database có sẵn column rỗng thì sẽ không có card placeHolder
// vì vậy phải xử lý 2 trường hợp này
import { generatePlaceholderCard } from "../../utils/formatter";
import Typography from "@mui/material/Typography";

import { IoIosArrowRoundDown } from "react-icons/io";
import getUploadTimeAgo from "../../utils/getUploadTimeAgo";
import Loader from "../../components/Loader/Loader";
import Files from "../../components/AppBar/Menus/Files";
import Skeleton from "@mui/material/Skeleton";
import { useParams } from "react-router-dom";
import Notification from "../../components/Notification/Notification";
import { useSelector } from "react-redux";
import handleCheckTypeFile from "../../utils/handleCheckTypeFile";
import Cover from "../../components/Card/UploadCover/Cover";
import Attach from "../../components/Card/UploadAttachment/Attach";

function Nav({ title, children, setIsOpenChooseCover, setIsOpenChooseAttach }) {
  return (
    <Box
      sx={{
        cursor: "pointer",
        backgroundColor: "#eee",
        marginTop: "14px",
        borderRadius: "8px",
        "&:hover": {
          backgroundColor: "#ccc", // Thay đổi màu nền khi hover
          transform: "scale(1.02)", // Thêm hiệu ứng phóng to nhẹ khi hover
        },
      }}
      onClick={() => {
        if (title === "Cover") {
          setIsOpenChooseCover(true);
          setIsOpenChooseAttach(false);
        } else if (title === "Attachment") {
          setIsOpenChooseCover(false);
          setIsOpenChooseAttach(true);
        }
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingX: "20px",
          paddingY: "10px",
          alignItems: "center",
        }}
      >
        {/* <FaRegImage size={20} /> */}
        {children}
        <Typography
          variant="body1"
          color="initial"
          style={{
            marginLeft: "12px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

const Navs = [
  {
    title: "Cover",
    icon: <FaRegImage size={20} />,
  },
  {
    title: "Join",
    icon: <IoPersonAddOutline size={20} />,
  },
  {
    title: "Members",
    icon: <MdOutlinePerson2 size={20} />,
  },
  {
    title: "Attachment",
    icon: <ImAttachment size={20} />,
  },
  {
    title: "Labels",
    icon: <IoPricetagsOutline size={20} />,
  },
  {
    title: "Custom Fields",
    icon: <MdOutlineDashboardCustomize size={20} />,
  },
  {
    title: "Move",
    icon: <FaArrowRightLong size={15} />,
  },
  {
    title: "Copy",
    icon: <MdContentCopy size={20} />,
  },
  {
    title: "Share",
    icon: <IoShareSocialOutline size={20} />,
  },
];

function Broad() {
  const [board, setBoard] = useState(null);
  const [description, setDescription] = useState(""); // State để lưu nội dung của editor
  const [card, setCard] = useState({});
  const [cardDataAfterUpdate, setCardAfterUpdate] = useState();
  const [isHiddenTextFieldDescription, setIsHiddenTextFieldDescription] =
    useState(false);
  const [isOpenQuill, setIsOpenQuill] = useState(false); // State để quản lý focus

  const [comment, setComment] = useState("");
  const [dataComments, setDataComments] = useState([]);
  const [isFocusedActivity, setIsFocusedActivity] = useState();

  const [isOpenChooseCover, setIsOpenChooseCover] = useState(false);
  const [isOpenChooseAttach, setIsOpenChooseAttach] = useState(false);
  // const [covers, setCover] = useState([]);
  const [coverValues, setCoverValues] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const [messaageNotifiction, setMessaageNotifiction] = useState("");
  const userId = localStorage.getItem("userId");
  const [boardIdInvite, setBoardIdInvite] = useState();

  const [cardId, setCardId] = useState(null);

  const { id } = useParams();

  const { socket } = useSelector((state) => state.socket);
  const { user } = useSelector((state) => state.user);
  if (socket) {
    socket.emit("saveSocketId", userId);
    socket.on("receiveNotification", ({ message, boardId }) => {
      setIsOpenNotification(true);
      setMessaageNotifiction(message);
      setBoardIdInvite(boardId);
    });
  }

  const handleAcceptInvite = () => {
    socket.emit("acceptInvite", { userId, boardIdInvite });
    setIsOpenNotification(false);
  };

  // ------------------Handle Comment --------------------

  const handleSaveComment = async () => {
    const data = {
      content: comment,
      userId,
      boardId: board?._id,
      cardId: card?._id,
    };
    const response = await createComment(data);

    setDataComments((pre) => [response[0], ...pre]);

    setIsFocusedActivity(false);
    setComment("");
  };

  // Hàm xử lý thay đổi nội dung
  const handleChangeComment = (value) => {
    setComment(value);
  };

  // ------------------Handle Attachment --------------------

  // const [previewUrls, setPreviewUrls] = useState([]);
  const onChangeFile = async (e) => {
    const formData = new FormData();
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    await updateCard(card._id, formData);
    setCardId(cardId);
    const response = await fetchCardDetail(card._id);
    setCard(response[0]);
  };

  // ------------------Handle Cover --------------------

  const handleChooseCoverAvailable = async (img) => {
    setCoverValues(img);
    const response = await updateCard(card._id, { cover: img });
    setCoverValues(response.cover);
  };

  const handleCoverChange = async (e) => {
    const cover = e.target.files[0];
    const formData = new FormData();
    formData.append("cover", cover);
    const responese = await updateCard(card._id, formData);
    setCoverValues(responese.cover);
  };

  const handleDeleteCover = () => {
    setCoverValues(null);
    updateCard(card._id, { cover: null });
  };

  // ------------------Handle Open Card --------------------

  const { data, isLoading } = useQuery({
    queryKey: ["card", cardId], // Khóa định danh bao gồm cả `userId`
    queryFn: () => fetchCardDetail(cardId), // Hàm lấy dữ liệu người dùng theo ID
    enabled: !!cardId,
    retry: false,
    refetchOnWindowFocus: true,
    staleTime: Infinity, // Dữ liệu sẽ luôn được coi là mới
    cacheTime: Infinity, // Dữ liệu sẽ không bao giờ bị xóa khỏi cache tự động
    onSuccess: (data) => {
      // console.log("data", data);
      setDescription(data[0]?.description);

      setCard(data[0]);
    },
  });

  const openDetailCard = async (cardId) => {
    setCoverValues("");
    setCardId(cardId);
    setIsOpenModal(true);
    setIsOpenQuill(false);
    const response = await fetchCardDetail(cardId);
    // console.log("response", response);
    const dataComments = await fetchAllComment(cardId);
    setDataComments(dataComments.reverse());

    // setDescription(response[0].description);

    setCard(response[0]);
  };

  // ------------------Handle Description --------------------

  const handleSaveDescripton = async () => {
    const response = await updateCard(card._id, { description: description });
    setDescription(response.description);
    setIsHiddenTextFieldDescription(true);

    setCardAfterUpdate(response);
    setIsOpenQuill(false);
  };

  const handleChangeDescription = (value) => {
    setDescription(value);
  };

  // ------------------Handle Column --------------------

  // CallApi tạo ra một cột mối
  const createNewColumns = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    //thêm cột vừa mới thêm vào bảng vào trong key con column của board
    //thêm id của  cột vừa mới thêm vào bảng vào trong key con columnOrderIds của board
    // Mục đích để setState của board để không phải F5 (callapi lại)
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);

    // thêm card placeholder khi thêm mới một cột rỗng
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];
    await updateBoardDetailsApi(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
    setBoard(newBoard);
  };

  //Hàm này có nhiệm vụ gọi API khi kéo thả columns xong (Gọi API update lại đối tượng board vì khi kéo thả cột thì key columnsOrderIds sẽ bị thay đổi )
  const moveColumns = async (dndOrderedColumns) => {
    const dndOderedColumnsIds = dndOrderedColumns.map((c) => c._id);

    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOderedColumnsIds;
    setBoard(newBoard);

    await updateBoardDetailsApi(newBoard._id, {
      columnOrderIds: newBoard.columnOrderIds,
    });
  };

  // ------------------Handle Card --------------------

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });
    const newBoard = { ...board };
    const columnToUpdate = newBoard.columns.find(
      (column) => createdCard.columnId === column._id
    );
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard);
      columnToUpdate.cardOrderIds.push(createdCard._id);
    }
    setBoard(newBoard);
  };

  const moveCardInTheSameColumn = async (
    dndOrderedCard,
    dndOrderedCardIds,
    columnId
  ) => {
    await updateColumnDetailsApi(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });

    const newBoard = { ...board };
    const columnTarget = newBoard.columns.find(
      (column) => column._id === columnId
    );
    columnTarget.cards = dndOrderedCard;
    columnTarget.cardOrderIds = dndOrderedCardIds;
    setBoard(newBoard);
  };

  const moveCardDifferentColumn = (
    prevColumnId,
    nextColumnId,
    currentCardId,
    orderedColumns
  ) => {
    const newBoard = { ...board };
    newBoard.columns = orderedColumns;
    setBoard(newBoard);

    let prevCardOrderIds = orderedColumns.find(
      (c) => c._id === prevColumnId
    ).cardOrderIds;
    if (prevCardOrderIds[0].includes("placeholder-card")) {
      prevCardOrderIds = [];
    }

    //Gọi API xử lý phía back-end
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: orderedColumns.find((c) => c._id === nextColumnId)
        ?.cardOrderIds,
    });
  };

  //làm hiệu ứng loading
  const deleteColumnDetails = (columnId) => {
    // update dữ liệu state board
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter((c) => c._id !== columnId);
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id !== columnId
    );
    setBoard(newBoard);
    //Gọi api xóa column
    deleteColumnDetailsApi(columnId)
      .then((res) => {
        toast.success(res.deleteResult, { theme: "colored" });
      })
      .catch();
  };

  useEffect(() => {
    fetchBoardDetailApi(id).then((board) => {
      board.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      setBoard(board);
    });
    if (socket) {
      socket.on("responseInvite", (message) => {
        window.location.reload();
        toast.success(message);
      });
    }
    // socket.emit("saveSocketId", userId);
  }, [coverValues, id]);

  if (!board) {
    return (
      // <Box
      //   sx={{
      //     display: "flex",
      //     alignItems: "center",
      //     justifyContent: "center",
      //     gap: 2,
      //     width: "100vw",
      //     height: "100vh",
      //   }}
      // >
      //   <CircularProgress />
      //   <Typography variant="body1" color="initial">
      //     Loading board ...
      //   </Typography>
      // </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Loader />
      </Box>
    );
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
      {isOpenModal && (
        <Box
          sx={{
            position: "fixed",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: "1000",
            paddingY: "50px",
            overflow: "auto",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              margin: "0 auto",
              maxWidth: "768px",
              minHeight: "20%",
              backgroundColor: "white",
              borderRadius: "12px",
              paddingX: "22px",
              paddingY: "24px",
            }}
          >
            {isLoading ? (
              <Stack spacing={2}>
                {/* For variant="text", adjust the height via font-size */}
                <Skeleton variant="rectangular" fullwidth height={200} />
                {/* For other variants, adjust the size with `width` and `height` */}
                <Grid container spacing={2}>
                  <Grid
                    item
                    md={9}
                    sx={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    <Skeleton variant="rectangular" fullwidth height={120} />
                    <Skeleton variant="rectangular" fullwidth height={120} />
                    <Skeleton variant="rectangular" fullwidth height={120} />
                  </Grid>
                  <Grid
                    item
                    md={3}
                    sx={{
                      paddingRight: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 4,
                    }}
                  >
                    <Skeleton variant="rectangular" fullwidth height={40} />
                    <Skeleton variant="rectangular" fullwidth height={40} />
                    <Skeleton variant="rectangular" fullwidth height={40} />
                    <Skeleton variant="rectangular" fullwidth height={40} />
                    <Skeleton variant="rectangular" fullwidth height={40} />
                    <Skeleton variant="rectangular" fullwidth height={40} />
                  </Grid>
                </Grid>
                <Skeleton variant="rectangular" fullwidth height={60} />
              </Stack>
            ) : (
              <>
                {isOpenChooseCover && (
                  <Box sx={{ position: "absolute", right: "-340px" }}>
                    <Cover
                      cardId={card._id}
                      setCoverValues={setCoverValues}
                      handleCoverChange={handleCoverChange}
                      setIsOpenChooseCover={setIsOpenChooseCover}
                      handleChooseCoverAvailable={handleChooseCoverAvailable}
                    />
                  </Box>
                )}

                {isOpenChooseAttach && (
                  <Box sx={{ position: "absolute", right: "-340px" }}>
                    <Attach
                      setIsOpenChooseAttach={setIsOpenChooseAttach}
                      onChangeFile={onChangeFile}
                    />
                  </Box>
                )}

                <Box
                  sx={{
                    position: "absolute",
                    right: "22px",
                    cursor: "pointer",
                    zIndex: "10",
                  }}
                >
                  <IconButton>
                    <IoMdClose
                      size={30}
                      onClick={() => setIsOpenModal(false)}
                      style={{ zIndex: "10" }}
                    />
                  </IconButton>
                </Box>
                {/* Cover  */}
                {coverValues || card?.cover ? (
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                      backgroundImage: `url(${coverValues || card?.cover})`,
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      position: "relative",
                      marginBottom: "22px",
                    }}
                  >
                    <IconButton
                      style={{
                        cursor: "pointer",
                        position: "absolute",
                        bottom: "5px",
                        right: "5px",
                      }}
                      onClick={handleDeleteCover}
                    >
                      <FaRegTrashAlt size={20} color="black" />
                    </IconButton>
                  </Box>
                ) : (
                  <></>
                )}

                {/* Header Card */}
                <Grid container spacing={2}>
                  <Grid item md={9}>
                    <Box sx={{ display: "flex", color: "#333" }}>
                      <FaRegCreditCard size={30} />
                      <Box sx={{ marginLeft: "10px" }}>
                        <Typography
                          variant="h3"
                          color="initial"
                          sx={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "20px",
                            marginBottom: "8px",
                          }}
                        >
                          {card?.title}
                        </Typography>
                        <Typography variant="body2" color="initial">
                          in list {card?.column[0]?.title}
                        </Typography>
                        <Box sx={{ marginY: "36px" }}>
                          <Typography variant="body1" color="initial">
                            Notification
                          </Typography>
                          <Box
                            sx={{
                              borderRadius: "4px",
                              cursor: "pointer",
                              display: "flex",
                              padding: "8px",
                              backgroundColor: "#eee",
                              alignItems: "center",
                              justifyContent: "space-evenly",
                              marginTop: "10px",
                            }}
                          >
                            <MdOutlineRemoveRedEye />
                            <Typography variant="body1" color="initial">
                              Watch
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box display="flex">
                          <GrTextAlignFull size={30} />
                          <Typography
                            sx={{
                              color: "#333",
                              fontWeight: "700",
                              fontSize: "20px",
                              marginBottom: "8px",
                              marginLeft: "12px",
                            }}
                          >
                            Description
                          </Typography>
                        </Box>
                        {card.description ||
                        cardDataAfterUpdate?.description ? (
                          <Button
                            variant="contained"
                            sx={{ marginBottom: "12px" }}
                            onClick={() => setIsOpenQuill(true)}
                          >
                            Edit
                          </Button>
                        ) : (
                          <></>
                        )}
                      </Box>

                      {/* -----------------------------Description-----------------------------                */}
                      {/* Description content */}
                      {card.description || cardDataAfterUpdate?.description ? (
                        <Box
                          display=""
                          mx=""
                          my=""
                          sx={{ display: isOpenQuill ? "none" : "block" }}
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(description),
                            }}
                          />
                        </Box>
                      ) : (
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={description?.replace(/<[^>]+>/g, "")} // Loại bỏ HTML tag để hiển thị text thuần
                          onFocus={() => {
                            setIsOpenQuill(true);
                          }} // Khi focus vào, bật ReactQuill
                          placeholder="Add more detalil description..."
                          sx={{
                            marginBottom: "12px",
                            display:
                              isOpenQuill || isHiddenTextFieldDescription
                                ? "none"
                                : "block",
                          }}
                        />
                      )}
                      {/* Quill description */}
                      {isOpenQuill && (
                        <ReactQuill
                          value={description} // Nội dung của editor
                          onChange={handleChangeDescription} // Sự kiện khi nội dung thay đổi
                          theme="snow" // Giao diện 'snow'
                          placeholder="Nhập nội dung tại đây..."
                          onBlur={() => setIsOpenQuill(false)} // Khi không focus nữa, chuyển về trạng thái ban đầu
                          style={{
                            height: "200px",
                          }}
                        />
                      )}
                      {/* Description Button */}
                      {isOpenQuill && (
                        <Box sx={{ marginBottom: "27px", padding: "3px" }}>
                          <Button
                            variant="contained"
                            onClick={handleSaveDescripton}
                          >
                            Save
                          </Button>
                          <Button
                            variant="text"
                            onClick={() => {
                              setDescription(card.description);
                              setIsOpenQuill(false);
                            }}
                          >
                            Cancel
                          </Button>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      <Box display="flex">
                        <ImAttachment size={30} />
                        <Typography
                          sx={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "20px",
                            marginBottom: "8px",
                            marginLeft: "12px",
                          }}
                        >
                          Attachment
                        </Typography>
                      </Box>
                      <Box sx={{ paddingY: "30px" }}>
                        {card.files.map((file, index) => {
                          return (
                            <Box
                              key={index}
                              display="flex"
                              mx=""
                              my=""
                              sx={{
                                alignItems: "center",
                                justifyContent: "space-between",
                                paddingY: "4px",
                              }}
                            >
                              <Box display="flex" sx={{ alignItems: "center" }}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "68px",
                                    height: "55px",
                                    padding: "12px",
                                    backgroundColor: "#eee",
                                    borderRadius: "8px",
                                    color: "#333",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                    boxShadow:
                                      "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                                  }}
                                >
                                  {handleCheckTypeFile(file.originalFileType)}
                                </Box>
                                <Box sx={{ marginLeft: "20px" }}>
                                  <Typography
                                    variant="body1"
                                    color="initial"
                                    sx={{ fontWeight: "600" }}
                                  >
                                    {file.originalFileName}
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    color="initial"
                                    sx={{ opacity: "0.5", fontSize: "12px" }}
                                  >
                                    {getUploadTimeAgo(file.uploadDate)}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box display="flex">
                                <IconButton sx={{ borderRadius: "4px" }}>
                                  <IoIosArrowRoundDown
                                    size={22}
                                    style={{
                                      cursor: "pointer",
                                      color: "black",
                                    }}
                                  />
                                </IconButton>
                                <Box
                                  sx={{
                                    backgroundColor: "#eee",
                                    marginLeft: "12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <Box>
                                    <Files />
                                  </Box>
                                </Box>
                              </Box>
                            </Box>
                          );
                        })}
                      </Box>
                    </Box>

                    <Box>
                      <Box display="flex">
                        <FiActivity size={30} />
                        <Typography
                          sx={{
                            color: "#333",
                            fontWeight: "700",
                            fontSize: "20px",
                            marginBottom: "8px",
                            marginLeft: "12px",
                          }}
                        >
                          Activity
                        </Typography>
                      </Box>

                      {/* Create Comment */}
                      <Box
                        display="flex"
                        mx=""
                        my=""
                        sx={{ justifyItems: "center" }}
                        gap={2}
                      >
                        <Avatar
                          variant="circular"
                          src={user?.avatar}
                          alt=""
                          sx={{ width: "40px", height: "40px" }}
                        />
                        <Box sx={{ width: "90%" }}>
                          {isFocusedActivity ? (
                            <ReactQuill
                              value={comment} // Nội dung của editor
                              onChange={handleChangeComment} // Sự kiện khi nội dung thay đổi
                              theme="snow" // Giao diện 'snow'
                              placeholder="Nhập nội dung tại đây..."
                              onBlur={() => setIsFocusedActivity(false)} // Khi không focus nữa, chuyển về trạng thái ban đầu
                              style={{ width: "90%", marginBottom: "22px" }}
                            />
                          ) : (
                            <TextField
                              placeholder="Write a comment ..."
                              sx={{
                                "&": {
                                  width: "100%",
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: "12px",
                                    "& .MuiInputBase-input": {
                                      paddingY: "12px",
                                    },
                                  },
                                },
                              }}
                              value={comment.replace(/<[^>]+>/g, "")}
                              // onChange={}
                              onFocus={() => {
                                setIsFocusedActivity(true);
                              }}
                            />
                          )}
                          {isFocusedActivity && (
                            <Box sx={{ marginBottom: "27px" }}>
                              <Button
                                variant="contained"
                                onClick={handleSaveComment}
                              >
                                Save
                              </Button>
                              <Button
                                variant="text"
                                onClick={() => {
                                  setIsFocusedActivity(false);
                                  setComment("");
                                }}
                              >
                                Cancel
                              </Button>
                            </Box>
                          )}
                        </Box>
                      </Box>

                      {dataComments.map((comment) => (
                        <Box
                          key={comment._id}
                          sx={{
                            paddingTop: "18px",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            marginBottom: "12px",
                          }}
                        >
                          <Avatar
                            variant="circular"
                            src={comment?.users[0]?.avatar}
                            alt=""
                            sx={{ width: "40px", height: "40px" }}
                          />
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                              }}
                            >
                              <Typography
                                color="gray"
                                sx={{ fontWeight: "700" }}
                              >
                                {comment?.users[0]?.email}
                              </Typography>
                              <Typography
                                variant="body1"
                                color="initial"
                                sx={{ fontSize: "10px", color: "#333" }}
                              >
                                {getUploadTimeAgo(comment?.createdAt)}
                              </Typography>
                            </Box>

                            <Typography variant="body1" color="initial">
                              <Box
                                dangerouslySetInnerHTML={{
                                  __html: DOMPurify.sanitize(comment?.content),
                                }}
                              ></Box>
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                      {/* Display comment */}
                    </Box>
                  </Grid>

                  <Grid item md={3} sx={{ marginTop: "94px" }}>
                    {Navs.map((i, index) => (
                      <Nav
                        key={index}
                        title={i.title}
                        setIsOpenChooseCover={setIsOpenChooseCover}
                        setIsOpenChooseAttach={setIsOpenChooseAttach}
                      >
                        {i.icon}
                      </Nav>
                    ))}
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Box>
      )}

      <AppBar></AppBar>
      {isOpenNotification && (
        <Notification
          handleAcceptInvite={handleAcceptInvite}
          messaageNotifiction={messaageNotifiction}
        />
      )}

      <Box
        sx={{
          backgroundImage: board.backgroundImage
            ? `url("${board.backgroundImage}")`
            : "none",
          backgroundColor: board.backgroundColor
            ? board.backgroundColor
            : "transparent",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <BroadBar board={board}></BroadBar>

        <BroadContent
          board={board}
          createNewColumns={createNewColumns}
          createNewCard={createNewCard}
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          moveCardDifferentColumn={moveCardDifferentColumn}
          deleteColumnDetails={deleteColumnDetails}
          openDetailCard={openDetailCard}
          coverValues={coverValues}
        ></BroadContent>
      </Box>
    </Container>
  );
}

export default Broad;
