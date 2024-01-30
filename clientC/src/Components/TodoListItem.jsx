import React, { useState } from "react";
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Button,
  useToast,
  Checkbox,
  CardFooter,
  Image,
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
    // <Card m="8px" maxW="md">
    //   <Box position="relative" padding="10">
    //     <CardHeader display="flex" justifyContent="center">
    //       <Heading size="md">{task.title}</Heading>
    //     </CardHeader>
    //     <Divider />
    //   </Box>
    //   <CardBody>
    //     <Stack divider={<StackDivider />} spacing="1">
    //       <Box
    //         display="flex"
    //         alignItems="center"
    //         justifyContent="space-between"
    //       >
    //         <Checkbox
    //           m="8px"
    //           size="lg"
    //           colorScheme="orange"
    //           isChecked={isChecked}
    //           onChange={toggleCheckbox}
    //         />
    //         <Text fontSize="md">{task.body}</Text>
    //         <Box alignItems="center" display="flex">
    //           <EditTaskForm task={task} onTaskEdited={onTaskEdited} />
    //           <Button
    //             onClick={() => {
    //               deleteTask();
    //             }}
    //             bg="none"
    //             mr="4px"
    //           >
    //             <DeleteIcon color="tomato" fontSize="20px" />
    //           </Button>
    //         </Box>
    //       </Box>
    //     </Stack>
    //   </CardBody>
    // </Card>
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      m="12px"
    >
      <Image
        objectFit="cover"
        maxW={{ base: "100%", sm: "200px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe"
      />

      <Stack>
        <CardBody>
          <Heading size="md"> {task.title} </Heading>
          <Text mt="4px" py="1">
            {task.body}
          </Text>
        </CardBody>

        <CardFooter>
          <Button
            onClick={() => {
              deleteTask();
            }}
            bg="none"
            mr="4px"
          >
            <DeleteIcon color="tomato" fontSize="20px" />
          </Button>
          <EditTaskForm task={task} onTaskEdited={onTaskEdited} />
          <Checkbox
            ml="22px"
            size="lg"
            colorScheme="orange"
            isChecked={isChecked}
            onChange={toggleCheckbox}
          />
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default TodoListItem;
