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
import { EditIcon } from "@chakra-ui/icons";

const EditTaskForm = ({ task, onTaskEdited }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const toast = useToast();

  const editTask = async () => {
    try {
      const response = await axios.put(`/api/task/${task._id}`, {
        title,
        body,
      });
      const updatedTask = response.data;

      toast({
        title: "Task Updated.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      if (onTaskEdited) {
        onTaskEdited(updatedTask);
      }
      onClose();
    } catch (error) {
      toast({
        title: "Error While Updating task.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button bg="none" ml="4px" onClick={onOpen}>
        <EditIcon color="blueviolet" fontSize="20px" />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                value={title || task.title}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Body</FormLabel>
              <Input
                onChange={(e) => setBody(e.target.value)}
                placeholder="Task description"
                value={body || task.body}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                editTask();
                onClose();
              }}
              colorScheme="blue"
              mr={3}
            >
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTaskForm;
