import Box from "@mui/material/Box";
import ListColumn from "./ListColumn/ListColumn";
import { mapOrder } from "../../../utils/sorts";
import {
  DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";
import Column from "./ListColumn/Column/Column";
import Card from "./ListColumn/Column/ListCards/Card/Card";
import { cloneDeep, isEmpty } from "lodash";
import { generatePlaceholderCard } from "../../../utils/formatter";
import { MouseSensor, TouchSensor } from "../../../customLibrary/DndKitSensors";

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: "ACTIVE_DRAG_ITEM_TYPE_COLUMN",
  CARD: "ACTIVE_DRAG_ITEM_TYPE_CARD",
};

function BroadContent({
  board,
  createNewColumns,
  createNewCard,
  moveColumns,
  moveCardInTheSameColumn,
  moveCardDifferentColumn,
  deleteColumnDetails,
  openDetailCard,
  coverValues,
}) {
  // Để biết phần tử hiện đang kéo thả là gì để:
  // + Sử dụng trong overlay
  // + Sử dụng trong xử lý card (nếu kéo column thì sẽ không xử lý. Chỉ xử lý khi kéo card)
  const [activeDargItemId, setActiveDargItemId] = useState(null);
  const [activeDargItemType, setActiveDargItemType] = useState(null);
  const [activeDargItemData, setActiveDargItemData] = useState(null);
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] =
    useState(null);
  const [orderedColumns, setOrderedColumns] = useState([]);
  const [isOpenDetailCard, SetIsOpenDetailCard] = useState(false);

  // -----------------------Xử lý cảm biến-------------------------------
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const toucnSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500,
    },
  });
  const sensors = useSensors(mouseSensor, toucnSensor);

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  // const collisionDetectionStrategy = useCallback(
  //   (args) => {
  //     if (activeDargItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
  //       return closestCorners({ ...args });
  //     }

  //     //Tìm các điểm giao nhau , va cham -intersection với con trỏ
  //     const pointerIntersections = pointerWithin(args);

  //     //Thuật toán phát hiện va chạm và trả về một mảng chứa các va chạm ở đây
  //     const intersections =
  //       pointerIntersections?.length > 0
  //         ? pointerIntersections
  //         : rectIntersection(args);

  //     //Tìm cái overId đầu tièn
  //     let overId = getFirstCollision(intersections);
  //   },
  //   [activeDargItemType]
  // );

  //Hàm tìm cột dựa vào idcard
  const findColumnByCardId = (idCard) => {
    return orderedColumns.find((column) =>
      column.cards.map((card) => card._id).includes(idCard)
    );
  };

  // ------------------ Xử lý sự kiện kéo card qua các cột khác nhau -----------------------------
  const moveCardBetweenDifferentColumns = (
    activeColumn,
    overColumn,
    activeDraggingCardId,
    overCardId,
    active,
    over,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns((pre) => {
      const nextColumns = cloneDeep(pre);

      // ------------- SAO CHÉP cột ACTIVE VÀ OVER ------------------------
      const nextActiveColums = nextColumns.find(
        (column) => column._id === activeColumn._id
      );
      const nextOverColums = nextColumns.find(
        (column) => column._id === overColumn._id
      );

      // ------------- Xử lý việc XÓA card khỏi cột ACTIVE và THÊM card ở cột OVER ------------------------

      // ------------- Xử lý việc XÓA card vào cột ACTIVE ------------------------
      if (nextActiveColums) {
        // xóa phần tử cardActive khỏi mảng
        nextActiveColums.cards = nextActiveColums.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Thêm placeHolderCard để xử lý lỗi column bị trống
        if (isEmpty(nextActiveColums.cards)) {
          nextActiveColums.cards = [generatePlaceholderCard(nextActiveColums)];
        }

        // cập nhật lại cardOrderIds cho chuẩn dữ liệu
        nextActiveColums.cardOrderIds = nextActiveColums.cards.map(
          (card) => card._id
        );
      }

      const overCardIndex = overColumn.cards.findIndex(
        (card) => card._id === overCardId
      );

      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height;
      const modifier = isBelowOverItem ? 1 : 0;

      let newCardIndex =
        overCardIndex >= 0
          ? overCardIndex + modifier
          : overColumn.cards.length + 1;

      // ------------- Xử lý việc THÊM card vào cột OVER ------------------------

      if (nextOverColums) {
        //Kiểm tra xem phần từ được kéo vào đã tồn tại hay chưa, nếu đã tồn tại thì xóa nó trước
        nextOverColums.cards = nextOverColums.cards.filter(
          (card) => card._id !== activeDraggingCardId
        );

        // Thêm phẩn tử cardAction vào trong mảng
        nextOverColums.cards = nextOverColums.cards.toSpliced(newCardIndex, 0, {
          ...activeDraggingCardData,
          columnId: nextOverColums._id,
        });

        // Xóa placeHoldercard
        nextOverColums.cards = nextOverColums.cards.filter(
          (card) => !card.FE_PlaceholderCard
        );

        //cập nhật lại cardOrderIds
        nextOverColums.cardOrderIds = nextOverColums.cards.map(
          (card) => card._id
        );
      }

      // Khi di chuyển card sang Column khác:
      // B1: cập nhật lại mảng cardOrderIds của Column ban đầu chứa nó (Xóa id của cái card đó ra khỏi mảng)
      // B2: Cập nhật mảng mảng cardOrderIds của Column tiếp theo (Thêm id của card đó vào trong mảng)
      // B3: Cập nhật lại trường columnId mới cho card

      return nextColumns;
    });

    if (triggerFrom === "handleDragEnd") {
      moveCardDifferentColumn(
        oldColumnWhenDraggingCard._id,
        overColumn._id,
        activeDraggingCardId,
        orderedColumns
      );
    }
  };

  // set lại dữ liệu các cột khi callapi
  useEffect(() => {
    const newBoard = { ...board };

    newBoard.columns = mapOrder(board?.columns, board?.columnOrderIds, "_id");

    newBoard.columns.forEach((column) => {
      column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
    });

    setOrderedColumns(newBoard.columns);
  }, [board]);

  // ------------------Bắt sự kiện khi Drag BẮT ĐẦU-----------------------------
  const handleDragStart = (event) => {
    // ------------------ Khi bắt đầu kéo thì sẽ setState để biết: Đang kéo CARD HAY COLUMN, ID, DATA (ACTIVE) ------------------------

    setActiveDargItemId(event.active.id);
    setActiveDargItemType(
      event?.active?.data?.current?.columnId
        ? ACTIVE_DRAG_ITEM_TYPE.CARD
        : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    );
    setActiveDargItemData(event?.active?.data?.current);

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id));
    }
  };

  // ------------------Bắt sự kiện khi ĐANG drag-----------------------------
  const handleDragOver = (event) => {
    if (activeDargItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return; // Nếu kéo column thì không sử lý gì cả

    const { active, over } = event;
    if (!active || !over) return;

    // ------------------------- Lấy ID của activeCard và overCard------------------------------
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData },
    } = active;
    const { id: overCardId } = over;
    // const activeCard = active.data.current

    // ------------------------- Lấy ra cột chứa phần tử activeCard và overCard ------------------------------
    const activeColumn = findColumnByCardId(activeDraggingCardId);
    const overColumn = findColumnByCardId(overCardId);
    if (!activeColumn || !overColumn) return; //nếu không tôn tại 1 trong 2 column này thì sẽ return luôn để tránh bị cash ứng dụng

    // Nếu card chỉ được kéo trong 1 cột hiện tại thì sẽ sử lý ở handleDragEnd
    // Nếu kéo card sang cột khác thì sẽ sử lý code ờ dưới
    if (activeColumn?._id !== overColumn?._id) {
      const triggerFrom = "handleDragOver";

      moveCardBetweenDifferentColumns(
        activeColumn,
        overColumn,
        activeDraggingCardId,
        overCardId,
        active,
        over,
        activeDraggingCardData,
        triggerFrom
      );
    }
  };

  // ------------------Bắt sự kiện khi drag KẾT THÚC-----------------------------
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    // ---------------- XỬ LÝ KÉO THẢ CARD -------------------------
    if (activeDargItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // ------------------------- Lấy ID của activeCard và overCard------------------------------
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData },
      } = active;
      const { id: overCardId } = over;

      // ------------------------- Lấy ra cột chứa phần tử activeCard và overCard ------------------------------
      const activeColumn = findColumnByCardId(activeDraggingCardId);
      const overColumn = findColumnByCardId(overCardId);

      if (!activeColumn || !overColumn) return; //nếu không tôn tại 1 trong 2 column này thì sẽ return luôn để tránh bị cash ứng dụng

      //Kéo thả card 2 cột khác nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        const triggerFrom = "handleDragEnd";
        moveCardBetweenDifferentColumns(
          activeColumn,
          overColumn,
          activeDraggingCardId,
          overCardId,
          active,
          over,
          activeDraggingCardData,
          triggerFrom
        );
      } else {
        // kéo thả card trong 1 cột
        //Lấy ra oldIndex và newIndex car
        const oldCardIndex = oldColumnWhenDraggingCard.cards.findIndex(
          (c) => c._id === activeDraggingCardId
        );
        const newCardIndex = overColumn.cards.findIndex(
          (c) => c._id === overCardId
        );

        const dndOrderedCard = arrayMove(
          oldColumnWhenDraggingCard.cards,
          oldCardIndex,
          newCardIndex
        );

        const dndOrderedCardIds = dndOrderedCard.map((card) => card._id);

        setOrderedColumns((pre) => {
          const nextColumns = cloneDeep(pre);

          const targetColumn = nextColumns.find(
            (column) => column._id === overColumn._id
          );

          targetColumn.cards = dndOrderedCard;
          targetColumn.cardOrderIds = dndOrderedCardIds;
          return nextColumns;
        });

        moveCardInTheSameColumn(
          dndOrderedCard,
          dndOrderedCardIds,
          oldColumnWhenDraggingCard._id
        );
      }
    }

    // ---------------- XỬ LÝ KÉO THẢ COLUMN -------------------------
    if (activeDargItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(
          (c) => c._id === active.id
        );
        const newColumnIndex = orderedColumns.findIndex(
          (c) => c._id === over.id
        );
        const dndOrderedColumns = arrayMove(
          orderedColumns,
          oldColumnIndex,
          newColumnIndex
        );

        console.log(dndOrderedColumns);

        // mục đích của hàm này là cho state cha biết state columns con (các column đã bị thay đổi vị trí do kéo thả) đã bị thay đổi và sẽ vào ra ngoài thay thay đổi columnOrderIds cho đúng vị trí các cột (vì khi component cha bị re-render thì các component con sẽ bị re-render theo và vị trí của các colum con sẽ được quyết định theo hàm trong  useEffect ở trên)
        // xxx Nếu không có hàm này  thì khi component cha bị re-render thì vị trí của các column vẫn chưa được cập nhật lại theo ý muôn mà sẽ bị quay trở lại vị trí ban đầu
        // tóm lại khi component cha bị re-render nếu các dữ liệu trong các componet con bị chỉnh sửa mà không không chuyền ngược lại update cho component cha thì khi component cha bị re-render sẽ trả về dữ liệu lúc chưa sửa
        // Vẫn gọi update State ở đây để tránh delay hoặc Flickering giao diện lúc kéo thả cần phải chời gọi API
        setOrderedColumns(dndOrderedColumns);
        moveColumns(dndOrderedColumns);
      }
    }

    // ---------------------- Set lại tất cả state về null khi kéo kết thúc --------------------
    setActiveDargItemData(null);
    setActiveDargItemType(null);
    setActiveDargItemId(null);
    setOldColumnWhenDraggingCard(null);
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      // collisionDetection={collisionDetectionStrategy}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragStart={handleDragStart}
      sensors={sensors}
    >
      <Box
        sx={{
          // bgcolor: (theme) =>
          //   theme.palette.mode === "dark" ? "#34495e" : "primary.main",
          // backgroundImage:
          //   'url("https://res.cloudinary.com/dfx86lojh/image/upload/v1728267334/uploads/alvlobbfgbc4vxeiwnch.jpg")',
          width: "100%",
          height: (theme) =>
            `calc(100vh - ${theme.trello.appBarHeight} - ${theme.trello.broadBarHeight})`,
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
        }}
      >
        {/* Column 01*/}
        <ListColumn
          columns={orderedColumns}
          createNewColumns={createNewColumns}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
          openDetailCard={openDetailCard}
          coverValues={coverValues}
        ></ListColumn>
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDargItemId && null}{" "}
          {activeDargItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDargItemData}></Column>
          )}
          {activeDargItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && (
            <Card card={activeDargItemData}></Card>
          )}
        </DragOverlay>
      </Box>
    </DndContext>
  );
}

export default BroadContent;
