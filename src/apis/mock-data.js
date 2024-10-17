/**
 * YouTube: TrungQuanDev - Một Lập Trình Viên
 * Created by trungquandev.com's author on Jun 28, 2023
 */
export const mockData = {
  board: {
    _id: "board-id-01",
    title: "TrungQuanDev MERN Stack Board",
    description: "Pro MERN stack Course",
    type: "public", // 'private'
    ownerIds: [], // Những users là Admin của board
    memberIds: [], // Những users là member bình thường của board
    columnOrderIds: ["column-id-02", "column-id-01", "column-id-03"], // Thứ tự sắp xếp / vị trí của các Columns trong 1 boards
    columns: [
      {
        _id: "column-id-01",
        boardId: "board-id-01",
        title: "To Do Column 01",
        cardOrderIds: [
          "card-id-02",
          "card-id-01",
          "card-id-03",
          "card-id-04",
          "card-id-05",
          "card-id-06",
          "card-id-07",
        ],
        cards: [
          {
            _id: "card-id-01",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 01",
            description: "Markdown Syntax (sẽ ở khóa nâng cao nhé)",
            cover:
              "https://trungquandev.com/wp-content/uploads/2022/07/fair-mern-stack-advanced-banner-trungquandev.jpg",
            memberIds: ["test-user-id-01"],
            comments: ["test comment 01", "test comment 02"],
            attachments: [
              "test attachment 01",
              "test attachment 02",
              "test attachment 03",
            ],
          },
          {
            _id: "card-id-02",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 02",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-03",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 03",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-04",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 04",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-05",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 05",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-06",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 06",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-07",
            boardId: "board-id-01",
            columnId: "column-id-01",
            title: "Title of card 07",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
        ],
      },
      {
        _id: "column-id-02",
        boardId: "board-id-01",
        title: "Inprogress Column 02",
        cardOrderIds: ["card-id-08", "card-id-09", "card-id-10"],
        cards: [
          {
            _id: "card-id-08",
            boardId: "board-id-01",
            columnId: "column-id-02",
            title: "Title of card 08",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-09",
            boardId: "board-id-01",
            columnId: "column-id-02",
            title: "Title of card 09",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-10",
            boardId: "board-id-01",
            columnId: "column-id-02",
            title: "Title of card 10",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
        ],
      },
      {
        _id: "column-id-03",
        boardId: "board-id-01",
        title: "Done Column 03",
        cardOrderIds: ["card-id-11", "card-id-12", "card-id-13"],
        cards: [
          {
            _id: "card-id-11",
            boardId: "board-id-01",
            columnId: "column-id-03",
            title: "Title of card 11",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-12",
            boardId: "board-id-01",
            columnId: "column-id-03",
            title: "Title of card 12",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
          {
            _id: "card-id-13",
            boardId: "board-id-01",
            columnId: "column-id-03",
            title: "Title of card 13",
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: [],
          },
        ],
      },
      // {
      //   _id: "column-id-04",
      //   boardId: "board-id-01",
      //   title: "Empty Column 04",
      //   cardOrderIds: ["column-id-4-placeholder-card"],
      //   cards: [
      //     {
      //       _id: "column-id-4-placeholder-card",
      //       boardId: "board-id-01",
      //       columnId: "column-id-04",
      //       FE_PlaceholderCard: true,
      //     },
      //   ],
      // },
    ],
  },
};

export const imgData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
];

export const backGrImageData = [
  {
    img: "https://images.unsplash.com/photo-1548439935-9e1390d83250?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Breakfast",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1675359655267-5f4f4aa39612?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Burger",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1674500771882-c8d9fb24e753?q=80&w=1975&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1550016598-add5550c93ac?q=80&w=2058&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Coffee",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1675359655209-edb25475ce57?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Hats",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1675315342824-1f010976ed32?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Honey",
  },
];
