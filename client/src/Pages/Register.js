import {
  Box,
  Text,
  Button,
  Heading,
  HStack,
  VStack,
  FormControl,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUP = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();

  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit = async () => {
    if (!(fullName && email && password)) {
      toast({
        title: "Veuillez remplir vos infornations ",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password.length > 6) {
      toast({
        title: "Le mot de passe doit contenir 6 caractères ou moins",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "le mot passe est incompatible",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email address",
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
        "/api/user/",
        { fullName, email, password },
        config
      );
      toast({
        title: "Account created.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("/tasks");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast({
          title: "Email is already taken",
          status: "error",
          duration: 5000,
          position: "bottom",
          isClosable: true,
        });
      } else {
        toast({
          title: "Failed to create a user",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDir="row"
      justifyContent="center"
      background="#ffffff"
    >
      <VStack w="50%" h="100vh" pos="left">
        <Heading fontSize="40px" pb="0" mb="0" mt="5%">
          Create a new Account
        </Heading>
        <FormControl
          autoComplete="off"
          m="4% 20% 4% 20%"
          w="60%"
          h="60%"
          justifyContent="center"
        >
          <FormLabel htmlFor="username">Full Name</FormLabel>
          <Input
            onChange={(e) => setFullName(e.target.value)}
            name="name"
            type="name"
            placeholder="name"
            w="100%"
            h="35px"
            borderRadius="5px"
            border="1px solid rgba(38, 50, 56, 0.50)"
          />

          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
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
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            w="100%"
            h="35px"
            required
            borderRadius="5px"
            border="1px solid rgba(38, 50, 56, 0.50)"
          />

          <FormLabel htmlFor="confirmPassword" mt="20px">
            Confirm Password
          </FormLabel>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            id="confirmPassword"
            type="password"
            name="password"
            placeholder="Confirm password"
            w="100%"
            h="35px"
            borderRadius="5px"
            border="1px solid rgba(38, 50, 56, 0.50)"
          />
          <Button
            type="submit"
            mt="35px"
            fontSize="20px"
            background="#263238"
            color="#FFF"
            onClick={onSubmit}
            borderRadius="6px"
            w="100%"
            h="40px"
          >
            Sign up
          </Button>
          <HStack mt="5px" ml="80px">
            <Text color="#A1A1A1">Have an account?</Text>
            <Link
              to="/login"
              style={{ textDecoration: "underline", cursor: "pointer" }}
              color="#718096"
            >
              Go to login
            </Link>
          </HStack>
        </FormControl>
      </VStack>
    </Box>
  );
};
export default SignUP;
