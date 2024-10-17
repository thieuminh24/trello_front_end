import Box from "@mui/material/Box";
import Column from "./Column/Column";
import Button from "@mui/material/Button";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";

import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

function ListColumn({
  columns,
  createNewColumns,
  createNewCard,
  deleteColumnDetails,
  openDetailCard,
  coverValues,
}) {
  const [openNewColumnForm, setopenNewColumnForm] = useState(false);
  const [newColumnTitle, setnewColumnTitle] = useState("");

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error("Please enter Column Title");
      return;
    }

    const createNewData = {
      title: newColumnTitle,
    };

    await createNewColumns(createNewData);

    toggleopenNewColumnForm();
    setnewColumnTitle("");
  };
  const toggleopenNewColumnForm = () =>
    setopenNewColumnForm(!openNewColumnForm);
  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
      <Box
        sx={{
          bgcolor: "inherit",
          width: "100%",
          height: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          "&::-webkit-scrollbar-track": { m: 2 },
        }}
      >
        {columns?.map((column) => {
          return (
            <Column
              key={column._id}
              column={column}
              createNewCard={createNewCard}
              deleteColumnDetails={deleteColumnDetails}
              openDetailCard={openDetailCard}
              coverValues={coverValues}
            ></Column>
          );
        })}
        {!openNewColumnForm ? (
          <Box
            onClick={() => toggleopenNewColumnForm()}
            sx={{
              minWidth: "200px",
              maxWidth: "200px",
              mx: 2,
              borderRadius: "6px",
              height: "fit-content !important",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "flex-start",
                pl: 2.5,
                py: 1,
              }}
              startIcon={<NoteAddIcon></NoteAddIcon>}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              borderRadius: "6px",
              padding: "8px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
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
              value={newColumnTitle}
              onChange={(e) => setnewColumnTitle(e.target.value)}
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },

                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                onClick={() => addNewColumn()}
                variant="contained"
                color="success"
                size="small"
                sx={{
                  boxShadow: "none",
                  border: "0.5px solid",
                  borderColor: (theme) => theme.palette.success.main,
                  "&:hover": { bgcolor: (theme) => theme.palette.success.main },
                }}
              >
                Add Column
              </Button>
              <CloseIcon
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                }}
                onClick={() => toggleopenNewColumnForm("")}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
}

export default ListColumn;
