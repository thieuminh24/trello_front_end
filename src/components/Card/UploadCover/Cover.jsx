import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { imgData } from "../../../apis/mock-data";
const Cover = ({
  handleCoverChange,
  setIsOpenChooseCover,

  handleChooseCoverAvailable,
}) => {
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
      >
        <IoMdClose size={20} onClick={() => setIsOpenChooseCover(false)} />
      </IconButton>
      <Box display="flex" mx="" my="" sx="">
        <Typography
          variant="body1"
          color="initial"
          sx={{ margin: " 5px auto", fontWeight: "600" }}
        >
          Cover
        </Typography>
      </Box>
      <Typography variant="body1" color="initial" sx={{ fontWeight: "500" }}>
        Photo from Unplash
      </Typography>
      <ImageList
        sx={{ maxWidth: "300px", height: 150 }}
        cols={3}
        rowHeight={40}
        gap={8}
      >
        {imgData.map((item) => (
          <ImageListItem
            onClick={() => {
              handleChooseCoverAvailable(item.img);
            }}
            key={item.id}
            sx={{
              cursor: "pointer",
              "&:hover .MuiImageListItemBar-root": {
                visibility: "unset", // Hiện bar khi hover
              },
            }}
          >
            <img src={item.img} alt={item.title} loading="lazy" />
            <ImageListItemBar
              sx={{
                visibility: "hidden",
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                  "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
              }}
              title={item.title}
              position="bottom"
              actionIcon={<StarBorderIcon />}
              actionPosition="left"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box>
        <Typography
          variant="body1"
          color="initial"
          sx={{ fontWeight: "500", marginBottom: "12px" }}
        >
          Attachments
        </Typography>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="avatar"
          name="image"
          type="file"
          onChange={handleCoverChange}
        />
        <label htmlFor="avatar">
          <Button
            component="span"
            role={undefined}
            variant="outlined"
            tabIndex={-1}
            sx={{ width: "100%" }}
            // startIcon={<CloudUploadIcon />}
            // style={{ marginTop: !!avatarPreview ? 30 : 0 }}
          >
            Upload a cover image
          </Button>
        </label>
      </Box>
    </Box>
  );
};

export default Cover;
