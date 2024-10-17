import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCardIcon from "@mui/icons-material/AddCard";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import ListCard from "./ListCards/ListCard";
import { useConfirm } from "material-ui-confirm";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

function Column({
  column,
  createNewCard,
  deleteColumnDetails,
  openDetailCard,
  coverValues,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyle = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };
  // Drag and drop
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const orderedCards = column.cards;

  const [openNewCardForm, setopenNewCardForm] = useState(false);
  const [newCardTitle, setnewCardTitle] = useState("");
  const toggleOpenNewCardForm = () => setopenNewCardForm(!openNewCardForm);
  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error("Please enter Card title");
      return;
    }

    const newCardData = {
      title: newCardTitle,
      columnId: column._id,
    };
    await createNewCard(newCardData);
    toggleOpenNewCardForm();
    setnewCardTitle("");
  };

  // Xử lý xóa một column và card bên trong nó
  const confirmDeleteColumn = useConfirm();
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: "Delete Column",
      description:
        "This action will permamently delete your Column and its Cards! Are you sure",
      confirmationText: "Confirm",
      cancellationText: "Cancel",
      dialogProps: { maxWidth: "xs" },
      allowClose: false,
    })
      .then(() => {
        deleteColumnDetails(column._id);
      })
      .catch(() => {});
  };

  return (
    <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: "300px",
          maxWidth: "300px",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trello.broadContentHeight} - ${theme.spacing(5)})`,
        }}
      >
        {/* Header column header*/}
        <Box
          sx={{
            height: (theme) => theme.trello.columnHeaderHeight,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontWeight: "bold", cursor: "pointer" }}>
            {column.title}
          </Typography>
          <Box>
            <Tooltip title="Edit Card">
              <ExpandMoreIcon
                sx={{ color: "white", cursor: "pointer" }}
                id="basic-button-workspace"
                aria-controls={open ? "basic-menu-workspace" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-workspace"
              anchorEl={anchorEl}
              open={open}
              onClick={handleClose}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button-workspace",
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
                sx={{
                  "&:hover": {
                    color: "success.light",
                    "& .add-card-icon": { color: "success.light" },
                  },
                }}
              >
                <ListItemIcon>
                  <AddCardIcon className="add-card-icon" fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />

              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  "&:hover": {
                    color: "warning.dark",
                    "& .delete-forever-item": { color: "warning.dark" },
                  },
                }}
              >
                <ListItemIcon>
                  <DeleteForeverIcon
                    className="delete-forever-item"
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>

              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Box list card */}
        <ListCard
          cards={orderedCards}
          openDetailCard={openDetailCard}
          coverValues={coverValues}
        ></ListCard>
        {/* Box colum header*/}
        <Box
          sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p: 2,
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                onClick={toggleOpenNewCardForm}
                startIcon={<AddCardIcon />}
              >
                Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: "pointer" }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                id="outlined-search"
                label="Enter column title ..."
                type="text"
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd="true"
                value={newCardTitle}
                onChange={(e) => setnewCardTitle(e.target.value)}
                sx={{
                  "& label": { color: "text.primary" },
                  "& input": {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#333643" : "white",
                  },
                  "& label.Mui-focused": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },

                    "&:hover fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },

                    "&.MuiOutlinedInput-input": {
                      borderRadius: 1,
                    },
                  },
                }}
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  onClick={() => addNewCard()}
                  variant="contained"
                  color="success"
                  size="small"
                  data-no-dnd="true"
                  sx={{
                    boxShadow: "none",
                    border: "0.5px solid",
                    borderColor: (theme) => theme.palette.success.main,
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.success.main,
                    },
                  }}
                >
                  Add
                </Button>
                <CloseIcon
                  fontSize="small"
                  sx={{
                    color: (theme) => theme.palette.warning.main,
                    cursor: "pointer",
                  }}
                  onClick={() => toggleOpenNewCardForm("")}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

export default Column;
