import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { v4 as uuidv4 } from "uuid";
import { BookState } from "../types";

//Defining our initialState's type
type initialStateType = {
  bookList: BookState[];
};

const bookList: BookState[] = [
  {
    id: uuidv4(),
    title: "Alice's Adventures in Wonderland",
    author: "Lewis Carroll",
  },
  {
    id: uuidv4(),
    title: "Gone Girl",
    author: "Gillian Flynn",
  },
  {
    id: uuidv4(),
    title: "Twilight",
    author: "Stephenie Meyer",
  },
];

const initialState: initialStateType = {
  bookList,
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addNewBook: (state, action: PayloadAction<BookState>) => {
      state.bookList.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<BookState>) => {
      const {
        payload: { title, id, author },
      } = action;

      state.bookList = state.bookList.map((book) =>
        book.id === id ? { ...book, author, title } : book
      );
    },
    deleteBook: (state, action: PayloadAction<{ id: string }>) => {
      state.bookList = state.bookList.filter(
        (book) => book.id !== action.payload.id
      );
    },
  },
});

// To able to use reducers we need to export them.
export const { addNewBook, updateBook, deleteBook } = bookSlice.actions;

//Selector to access bookList state.
export const selectBookList = (state: RootState) => state.book.bookList;

export default bookSlice.reducer;
