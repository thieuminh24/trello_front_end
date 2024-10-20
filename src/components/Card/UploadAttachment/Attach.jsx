import {
  Button,
  Divider,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import Box from "@mui/material/Box";
import { IoMdClose } from "react-icons/io";

const Attach = ({ setIsOpenChooseAttach, onChangeFile }) => {
  return (
    <Box
      sx={{
        position: "relative",
        minWidth: "300px",
        height: "400px",
        backgroundColor: "white",
        padding: "14px",
        borderRadius: "12px",
      }}
    >
      <IconButton
        style={{ position: "absolute", right: "12px", cursor: "pointer" }}
        onClick={() => setIsOpenChooseAttach(false)}
      >
        <IoMdClose size={20} />
      </IconButton>
      <Box display="flex" mx="" my="" sx="">
        <Typography
          variant="body1"
          color="initial"
          sx={{ margin: " 5px auto", fontWeight: "600" }}
        >
          Attach
        </Typography>
      </Box>
      <Typography variant="body1" color="initial" sx={{ fontWeight: "500" }}>
        Attach a file from your computer
      </Typography>

      <Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{ marginBottom: "12px" }}
        >
          You can also drag and drop files to upload them.
        </Typography>
        <input
          style={{ display: "none" }}
          id="file"
          name="files"
          type="file"
          onChange={onChangeFile}
          multiple
        />
        <label htmlFor="file">
          <Button
            component="span"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            sx={{ width: "100%" }}
            // startIcon={<CloudUploadIcon />}
            // style={{ marginTop: !!avatarPreview ? 30 : 0 }}
          >
            Choose a file
          </Button>
        </label>
      </Box>
      <Divider
        variant="fullWidth"
        orientation="horizontal"
        sx={{ marginY: "10px" }}
      />
      <Box display="flex" mx="" my="" sx="" flexDirection="column" gap={2}>
        <Box display="flex" mx="" my="" flexDirection="column" gap={1}>
          <label htmlFor="" style={{ fontWeight: "500" }}>
            Search or paste a link
          </label>
          <TextField
            id=""
            label=""
            placeholder="Find recent links or paste a new link"
            sx={{
              "& .MuiInputBase-root .MuiInputBase-input": {
                paddingY: "10px",
              },
            }}
            // value={}
            // onChange={}
          />
        </Box>

        <Box
          display="flex"
          mx=""
          my=""
          flexDirection="column"
          gap={1}
          sx={{ marginBottom: "12px" }}
        >
          <label htmlFor="" style={{ fontWeight: "500" }}>
            Display text (optional)
          </label>
          <TextField
            id=""
            label=""
            placeholder="Text to display"
            sx={{
              "& .MuiInputBase-root .MuiInputBase-input": {
                paddingY: "10px",
              },
            }}
            // value={}
            // onChange={}
          />
        </Box>
        <Box
          display=""
          mx=""
          my=""
          sx={{ position: "relative", left: "168px" }}
        >
          <Button variant="contained">Insert</Button>
          <Button variant="text">Cancel</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Attach;
