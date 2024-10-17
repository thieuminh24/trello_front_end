import { Box, Card as MuiCard } from "@mui/material";
// import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import GroupIcon from "@mui/icons-material/Group";
// import CommentIcon from "@mui/icons-material/Comment";
// import AttachmentIcon from "@mui/icons-material/Attachment";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GrAttachment, GrTextAlignFull } from "react-icons/gr";

function Card({ card, openDetailCard, coverValues }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card._id, data: { ...card } });

  const dndKitCardStyle = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
    border: isDragging ? "1px solid #2ecc71" : undefined,
  };

  // const shouldShowCardAction = () => {
  //   return (
  //     !!card?.memberIds?.length ||
  //     !!card?.comments?.length ||
  //     !!card?.attachments?.length
  //   );
  // };
  return (
    <MuiCard
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      sx={{
        borderRadius: "12px",
        maxWidth: 345,
        boxShadow: "0 1px 1px rgba(0, 0, 0, 0.2)",
        // overflow: "unset",
        // display:  "none" : "block",
        overflow: card?.FE_PlaceholderCard ? "hiden" : "unset",
        height: card?.FE_PlaceholderCard ? "0px" : "unset",
        border: "1px solid transparent",
        "&:hover": { borderColor: (theme) => theme.palette.primary.main },
      }}
      onClick={() => openDetailCard(card._id)}
    >
      {card?.cover ? (
        <CardMedia
          sx={{
            height: 140,
            borderRadius: "12px 12px 0px 0px",

            "&:last-child": { p: 1 },
          }}
          image={card?.cover}
        />
      ) : (
        <></>
      )}

      <CardContent sx={{ p: 1.5 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontSize: "1rem" }}
        >
          {card.title}
        </Typography>
        {card?.files >= 1 || card?.description ? (
          <Box display="flex" alignItems="center" gap={2}>
            <Box>
              <GrTextAlignFull size={15} />
            </Box>
            <Box display="flex" gap={0.5}>
              <GrAttachment size={15} />
              <Typography variant="body1" color="initial">
                {card?.files.length}
              </Typography>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </CardContent>
      {/* {shouldShowCardAction() && (
        <CardActions>
          {!!card?.memberIds?.length && (
            <Button size="small" startIcon={<GroupIcon />}>
              {card?.memberIds?.length}
            </Button>
          )}

          {!!card?.comments?.length && (
            <Button size="small" startIcon={<CommentIcon />}>
              {card?.comments?.length}
            </Button>
          )}

          {!!card?.attachments?.length && (
            <Button size="small" startIcon={<AttachmentIcon />}>
              {card?.attachments?.length}
            </Button>
          )}
        </CardActions>
      )} */}
    </MuiCard>
  );
}

export default Card;
