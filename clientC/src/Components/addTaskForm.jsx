import React, { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AddTaskForm = ({ onTaskAdded }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();

  const addTask = async () => {
    if (!(title && body)) {
      toast({
        title: "Veuillez remplir vos infornations ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      const response = await axios.post("/api/task", { title, body });
      const newTask = response.data;

      toast({
        title: "Task Created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      if (onTaskAdded) {
        onTaskAdded(newTask);
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error While Creating task.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
        bg="paleturquoise"
        opacity="300%"
        size="md"
        ml="20px"
        onClick={onOpen}
      >
        Add Task
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                ref={initialRef}
                placeholder="Task title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Input
                onChange={(e) => setBody(e.target.value)}
                placeholder="Task description"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                addTask();
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskForm;
