import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import styles from "./Chatting.module.css"
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";

const firebaseConfig = {
  apiKey: "AIzaSyDu9vt8G3TVHwkJvfilXa0lyvwst3Da_lI",
  authDomain: "a-chatting-app-b721d.firebaseapp.com",
  projectId: "a-chatting-app-b721d",
  storageBucket: "a-chatting-app-b721d.appspot.com",
  messagingSenderId: "145084853077",
  appId: "1:145084853077:web:693671cbb7de2a63b15ddc",
  measurementId: "G-0S6LDGBZEV",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function Chatting() {
  const space = useRef();
  const [messageValue, setMessageValue] = useState("");
  const [data, setData] = useState([]);
  const handleData = async () => {
    let res = await fetch(`https://dry-hamlet-98371.herokuapp.com/chatting`);
    res = await res.json();
    setData(res);
    space.current.scrollIntoView({ block: "end" });
  };
  useEffect(() => {
    handleData();
  }, [data]);

  const requestToMessage = async (e) => {
    e.preventDefault();
    if (messageValue.length === 0) {
      return;
    } else {
      let { photoURL } = auth.currentUser;
      let data1 = {
        message: messageValue,
        photoURL: photoURL,
      };
      let res = await fetch(`https://dry-hamlet-98371.herokuapp.com/chatting`, {
        method: "POST",
        body: JSON.stringify(data1),
        headers: {
          "Content-Type": "application/json",
        },
      });
      res = await res.json();
      console.log(res);
      handleData();
      setMessageValue("");
    }
  };
  const handleMessage = (id, currentPhotoURL) => {
    let { photoURL } = auth.currentUser;
    if (photoURL === currentPhotoURL) {
      const new_message = prompt("New Message");
      setTimeout(function () {
        handleEdit(new_message, id);
      }, 2000);
    } else {
      alert("You don't have access to this message");
    }
  };
  const handleEdit = async (message, id) => {
    if (message.length === 0) {
      alert("write something in edit");
    } else {
      const data = {
        message: message,
      };
      let res = await fetch(
        `https://dry-hamlet-98371.herokuapp.com/chatting/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = await res.json();
      console.log(res);
      handleData();
    }
  };
  const handleDelete = async (id, currentPhotoURL) => {
    let { photoURL } = auth.currentUser;
    if (photoURL === currentPhotoURL) {
      let res = await fetch(
        `https://dry-hamlet-98371.herokuapp.com/chatting/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      res = res.json;
      console.log(res);
      handleData();
    } else {
      alert("You don't have access to this message");
    }
  };
  const { photoURL } = auth.currentUser;
  // fontSize={{ base: '24px', md: '40px', lg: '56px' }}
  return (
    <>
      <VStack direction={["row", "column"]} spacing="24px" align="left">
        <Flex justify="center" alignItems="left" height="40px" mt={3} gap="2">
          <Heading color={"tomato"}>Umang's Chatting App</Heading>
          <Button colorScheme="blue" zIndex={2} onClick={() => auth.signOut()}>
            Sign Out
          </Button>
        </Flex>
        <Flex direction="column" gap={"6"}>
          {data.chattingapps &&
            data.chattingapps.map((el, i) =>
              photoURL === el.photoURL ? (
                <Flex
                  justify="center"
                  alignItems="centre"
                  height="40px"
                  mt={{ base: "0px", lg: "20px" }}
                  ml={{ base: "100px", lg: "50px" }}
                  mr={{ base: "100px", lg: "50px" }}
                  mb={{ base: "100px", lg: "50px" }}
                  key={i}
                  gap="2"
                >
                  <Box
                    bg="tomato"
                    w="auto"
                    h="auto"
                    borderRadius={"100"}
                    mt={"5px"}
                    color="white"
                  >
                    <Text fontSize="lg">{el.message}</Text>
                  </Box>
                  <Box mt="40px" ml="-60px">
                    <Button
                      h="20px"
                      zIndex={2}
                      colorScheme="teal"
                      mr="20px"
                      onClick={() => handleMessage(el._id, el.photoURL)}
                    >
                      Edit
                    </Button>
                    <Button
                      h="20px"
                      zIndex={2}
                      colorScheme="teal"
                      onClick={() => handleDelete(el._id, el.photoURL)}
                    >
                      Delete
                    </Button>
                  </Box>
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={el.photoURL}
                    alt="Google account pic"
                  />
                </Flex>
              ) : (
                <Flex
                  w="auto"
                  h="auto"
                  justify="left"
                  ml={{ base: "0px", lg: "450px" }}
                  alignItems="center"
                  height="40px"
                  gap="2"
                  mt={{ base: "0px", lg: "25px" }}
                  key={i}
                >
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={el.photoURL}
                    alt="Google account pic"
                  />
                  <Box
                    bg="#718096"
                    w="auto"
                    h="auto"
                    p={1}
                    borderRadius={"20px"}
                    mt={"10px"}
                    color="white"
                  >
                    <Text fontSize="lg">{el.message}</Text>
                  </Box>
                  <Box mt="70px" ml="-60px">
                    <Button
                      zIndex={2}
                      h="20px"
                      mr="10px"
                      colorScheme="blue"
                      onClick={() => handleMessage(el._id, el.photoURL)}
                    >
                      Edit
                    </Button>
                    <Button
                      zIndex={2}
                      h="20px"
                      colorScheme="blue"
                      onClick={() => handleDelete(el._id, el.photoURL)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Flex>
              )
            )}
          <div ref={space}></div>
        </Flex>
      </VStack>
      <FormControl>
        <Flex
          justify={"center"}
          mt="3"
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          width={"100%"}
        >
          <Input
            w={{ base: "250px", lg: "450px" }}
            position="fixed"
            left={0}
            right={0}
            bottom={0}
            color="white"
            ml={{ base: "0px", lg: "450px" }}
            mb="20px"
            height="2rem"
            placeholder="write your message here"
            type="text"
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <Button
            colorScheme="red"
            onClick={requestToMessage}
            position="fixed"
            w={{ base: "140px", lg: "180px" }}
            ml={{ base: "250px", lg: "910px" }}
            fontSize={{ base: "14px", lg: "18px" }}
            left={0}
            right={0}
            bottom={0}
            mb="15px"
          >
            Send your message
          </Button>
        </Flex>
      </FormControl>
    </>
  );
}

export default Chatting;
