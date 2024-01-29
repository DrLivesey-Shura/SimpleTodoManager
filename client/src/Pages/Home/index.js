import React from "react";
import { Helmet } from "react-helmet";

import { Box } from "@chakra-ui/react";
import headerImage from "../../assets/bgpic.jpg";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Pert-Master</title>
      </Helmet>
      <Box
        bgImage={`url(${headerImage})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        h="100vh"
        position={"relative"}
      >
        <Box
          position={"absolute"}
          w="full"
          h="full"
          bg="black"
          opacity={"60%"}
        ></Box>
        <Navbar />
        <Header />
      </Box>
      <Footer />
    </>
  );
}
