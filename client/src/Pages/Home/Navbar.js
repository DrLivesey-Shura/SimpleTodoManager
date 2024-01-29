import React from "react";
import { Link } from "react-router-dom";
import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  HStack,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
// import Logo from "../../assets/images/logo2.png";

export default function Navbar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <>
      <chakra.header
        w="full"
        px={{ base: 4, sm: 6, md: 8, xl: 20 }}
        py={4}
        position={"relative"}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.h1
              pt={6}
              fontSize="2xl"
              color="white"
              fontWeight="medium"
              cursor="pointer"
            >
              Welcome
            </chakra.h1>
          </Flex>

          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={4}
              mr={1}
              display={{ base: "none", md: "inline-flex" }}
            >
              <chakra.a color="white">
                <Link to="/login">Login</Link>
              </chakra.a>

              <chakra.a
                colorScheme="blue"
                bg="blue.500"
                color="white"
                px="6"
                py="1.5"
                rounded="sm"
                variant="none"
                fontWeight="light"
              >
                <Link to="/register">SignUp</Link>
              </chakra.a>
            </HStack>
            {/* navbar in small screens */}
            <Box display={{ base: "inline-flex", md: "none" }}>
              {/* menu icon */}
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.50", "inherit")}
                variant="none"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />
              {/* nav links */}
              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />
                <Link to="/login">Login</Link>
                <Link to="/signin">Sign in</Link>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
}
