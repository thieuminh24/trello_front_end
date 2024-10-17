import Box from "@mui/material/Box";
import Card from "./Card/Card";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

function ListCard({ cards, openDetailCard, coverValues }) {
  return (
    <SortableContext
      items={cards?.map((c) => c._id)}
      strategy={verticalListSortingStrategy}
    >
      <Box
        sx={{
          m: "0 5px 5px 5px",
          p: "0 5px",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          overflowX: "hidden",
          overflowY: "auto",

          maxHeight: (theme) =>
            `calc(${theme.trello.broadContentHeight} - ${theme.spacing(5)} - ${
              theme.trello.columnHeaderHeight
            } - ${theme.trello.columnFooterHeight})`,

          "&:: -webkit-scrollbar-thumb": { backgroundColor: "#ced0da" },
          "&:: -webkit-scrollbar-thumb:hover": { backgroundColor: "#bfc2cf" },
        }}
      >
        {cards?.map((card, index) => {
          return (
            <Card
              key={index}
              card={card}
              openDetailCard={openDetailCard}
              coverValues={coverValues}
            ></Card>
          );
        })}
      </Box>
    </SortableContext>
  );
}

export default ListCard;
