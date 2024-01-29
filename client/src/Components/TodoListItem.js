import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Box,
  Heading,
  Stack,
  StackDivider,
  Text,
  Button,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import EditTaskForm from "./editTaskForm";

const TodoListItem = ({ task, onTaskDeleted, onTaskEdited }) => {
  const taskID = task._id;
  const toast = useToast();
  const [isChecked, setIsChecked] = useState(task.isDone);

  const deleteTask = async () => {
    try {
      await axios.delete(`/api/task/${taskID}`);

      toast({
        title: "Task Deleted with Success.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      if (onTaskDeleted) {
        onTaskDeleted(taskID);
      }
    } catch (error) {
      toast({
        title: "Error Deleting Task.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toggleCheckbox = async () => {
    try {
      const response = await axios.put(`/api/task/${taskID}`, {
        isDone: !isChecked,
      });
      const updatedTask = response.data;
      setIsChecked(updatedTask.isDone);
    } catch (error) {
      toast({
        title: "Error Updating Task Status.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Card m="8px">
      <CardHeader>
        <Heading size="md">{task.title}</Heading>
      </CardHeader>
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Checkbox
              m="8px"
              size="lg"
              colorScheme="orange"
              isChecked={isChecked}
              onChange={toggleCheckbox}
            />
            <Text fontSize="sm">{task.body}</Text>
            <Box alignItems="center" display="flex">
              <EditTaskForm task={task} onTaskEdited={onTaskEdited} />
              <Button
                onClick={() => {
                  deleteTask();
                }}
                bg="none"
                mr="4px"
              >
                <DeleteIcon color="tomato" fontSize="20px" />
              </Button>
            </Box>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default TodoListItem;
