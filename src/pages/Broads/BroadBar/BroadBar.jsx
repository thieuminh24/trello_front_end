import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../../../utils/formatter";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector } from "react-redux";
import { GrUserAdmin } from "react-icons/gr";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { toast } from "react-toastify";
const MENU_STYLE = {
  color: "white",
  bgcolor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

const BroadBar = ({ board }) => {
  const { user, loading } = useSelector((state) => state.user);
  const userId = localStorage.getItem("userId");
  const emailUser = user.email;
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  let name;
  if (loading === false) {
    name = `${user.firstName} ${user.lastName}`;
  }

  const { socket } = useSelector((state) => state.socket);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {});
  return (
    <Box
      px={2}
      sx={{
        width: "100%",
        height: (theme) => theme.trello.broadBarHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 2,
        overflowX: "auto",
        // bgcolor: (theme) =>
        //   theme.palette.mode === "dark" ? "#34495e" : "primary.main",
        bgcolor: "transparent",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLE}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>

        <Chip
          sx={MENU_STYLE}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<AddToDriveIcon />}
          label="Add to google drive"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />

        <Chip
          sx={MENU_STYLE}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          // position: "relative",
        }}
      >
        {userId === board.userId ? (
          <Button
            startIcon={<GrUserAdmin color="white" size={40} />}
            sx={{ color: "white" }}
          >
            Admin
          </Button>
        ) : (
          <Button startIcon={<IoIosPeople />} sx={{ color: "white" }}>
            Member
          </Button>
        )}

        <Button
          onClick={handleClickOpen}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": { borderColor: "white", borderWidth: "1px" },
          }}
          variant="outlined"
          startIcon={<LibraryAddIcon />}
        >
          Invite
        </Button>

        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              // if()
              const arr = board?.users.filter((user) => user.email === email);
              if (arr.length >= 1) {
                toast.warning("User has been join board");
              } else {
                socket.emit("sendNotification", { email, name, boardId: id });
              }
              handleClose();
            },
          }}
        >
          <DialogTitle>Invite Board</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Nhập email người bạn muốn mời vào board
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Invite</Button>
          </DialogActions>
        </Dialog>
        <AvatarGroup
          max={4}
          sx={{
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              borderColor: "transparent",
              cursor: "pointer",
              "first-of-type": { bgcolor: "#a4b0be" },
            },
          }}
        >
          {board?.users?.map((user) => (
            <Tooltip
              key={user._id}
              title={emailUser === user.email ? "You" : user.email}
            >
              <Avatar alt="ThieuMinh" src={user.avatar} />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
};

BroadBar.propTypes = {
  board: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default BroadBar;
