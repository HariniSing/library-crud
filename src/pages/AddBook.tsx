import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addNewBook, updateBook } from "../redux/bookSlice";
import { v4 as uuidv4 } from "uuid";
import { useParams, useHistory } from "react-router-dom";

const AddBook = () => {
  const { id } = useParams<{ id: string }>(); //If user comes from /update-book, we will catch id of that book here.
  const history = useHistory();
  const dispatch = useAppDispatch();
  const book = useAppSelector((state) =>
    state.book.bookList.find((book) => book.id === id)
  ); // Selecting particular book's information to prefill inputs for updating.

  const [title, setTitle] = useState<string | undefined>(book?.title || ""); // We are initializing useStates if book variable has title or author.
  const [author, setAuthor] = useState<string | undefined>(book?.author || "");

  const handleOnSubmit = () => {
    if (!title) {
      toast.error("Required Title", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (!author) {
      toast.error("Required Author Name", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    if (id) {
      editBook();
      return;
    }
    dispatch(addNewBook({ author, title, id: uuidv4() }));
    toast.success("Book added successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    clearInputs();
  };

  const editBook = () => {
    dispatch(updateBook({ author, title, id }));
    toast.success("Book updated successfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    setTimeout(() => {
      clearInputs();
      history.push("/");
    }, 1000);
  };

  const clearInputs = () => {
    setTitle("");
    setAuthor("");
  };

  return (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box width="50%">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          marginBottom="20px"
        >
          <Heading color="white">{id ? "Edit" : "Add"} Book</Heading>
        </Box>
        <FormControl isRequired>
          <FormLabel color="white">Title</FormLabel>
          <Input
            value={title}
            color="white"
            placeholder="The Lord of the Rings"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <FormLabel color="white" marginTop={4}>
            Author
          </FormLabel>
          <Input
            value={author}
            color="white"
            placeholder="J.R.R Tolkien"
            onChange={(e) => setAuthor(e.currentTarget.value)}
          />
        </FormControl>
        <Button
          marginTop={4}
          colorScheme="teal"
          type="submit"
          onClick={handleOnSubmit}
        >
          Submit
        </Button>
      </Box>
    </Flex>
  );
};

export default AddBook;
