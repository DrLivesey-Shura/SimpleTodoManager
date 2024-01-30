import { Box, CardBody, Spinner, useToast } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import TodoListItem from "../Components/TodoListItem";
import axios from "axios";
import { Card, CardHeader, Heading } from "@chakra-ui/react";
import AddTaskForm from "../Components/addTaskForm";

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const handleTaskDeleted = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const handleTaskEdit = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === updatedTask._id ? updatedTask : task
      )
    );
  };

  const handleTaskAdd = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const getTasks = useCallback(async () => {
    try {
      const response = await axios.get("/api/task/");
      const fetchedTasks = response.data;

      setTasks(fetchedTasks);
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error fetching the projects.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [toast]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <Box
      mt={{ base: "20px", md: "50px" }}
      ml={{ base: "20px", md: "150px" }}
      mr={{ base: "20px", md: "150px" }}
    >
      <Card p="20px" boxShadow="md">
        <CardHeader display="flex" justifyContent="center" alignItems="center">
          <Heading mr="20px" size="lg">
            Your Tasks
          </Heading>
          <AddTaskForm onTaskAdded={handleTaskAdd} />
        </CardHeader>
        {loading ? (
          <Box
            m="16px"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        ) : (
          <CardBody m="12px">
            {tasks.map((task) => (
              <TodoListItem
                key={task._id}
                task={task}
                onTaskDeleted={handleTaskDeleted}
                onTaskEdited={handleTaskEdit}
              />
            ))}
          </CardBody>
        )}
      </Card>
    </Box>
  );
};

export default Task;
