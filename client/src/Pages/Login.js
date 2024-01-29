import {
  Box,
  Text,
  Button,
  Heading,
  HStack,
  Checkbox,
  VStack,
  FormControl,
  Input,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const toast = useToast();
  const onSubmit = async () => {
    if (!(email && password)) {
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
      const config = { headers: { "content-type": "application/json" } };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/tasks");
    } catch (error) {
      toast({
        title: "error conect.",
        description: "Cette information est incorrectes.",
        status: "error",
        duration: 9000,
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      w="100%"
      display="flex"
      flexDir="row"
      justifyContent="center"
      background="#ffffff"
    >
      <VStack w="50%" h="100vh" pos="right">
        <Heading fontSize="40px" pb="0" mb="0" mt="5%">
          Login to your account
        </Heading>
        <FormControl
          autoComplete="off"
          m="10% 20% 10% 20%"
          w="60%"
          h="40%"
          justifyContent="center"
        >
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            type="email"
            placeholder="mail@abc.com"
            w="100%"
            h="35px"
            borderRadius="5px"
            border="1px solid rgba(38, 50, 56, 0.50)"
          />

          <FormLabel htmlFor="password" mt="20px">
            Password
          </FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            w="100%"
            h="35px"
            borderRadius="5px"
            border="1px solid rgba(38, 50, 56, 0.50)"
          />

          <HStack justify="space-between">
            <Checkbox defaultChecked color="#A1A1A1">
              Remember me
            </Checkbox>
            <Link size="sm" color="#264791">
              Forgot password?
            </Link>
          </HStack>

          <Button
            type="submit"
            onClick={onSubmit}
            mt="35px"
            fontSize="20px"
            background="#263238"
            color="#FFF"
            borderRadius="6px"
            w="100%"
            h="40px"
          >
            Login
          </Button>
        </FormControl>
        <HStack mt="0">
          <Text color="#A1A1A1">Not Registered Yet?</Text>
          <Link to="/register" size="sm" color="#718096">
            Cerate an account
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Login;
