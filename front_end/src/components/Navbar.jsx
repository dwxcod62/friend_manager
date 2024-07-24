import { Box, Button, Container, Flex, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import CreateUserModel from "./CreateUserModel";

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Container maxW={"900px"}>
            <Box px={4} my={4} borderRadius={5} bg={useColorModeValue("gray.200", "gray.700")}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
                    {/* Left side */}
                    <Flex alignItems={"center"} justifyContent={"center"} gap={3} display={{ base: "none", sm: "flex" }}>
                        <img src="/icon.jpg" width={50} height={50} style={{ borderRadius: "5px" }} />
                        <Text fontSize={"32px"}> Kudamii </Text>
                    </Flex>
                    {/* Right side */}
                    <Flex alignItems={"center"} gap={3}>
                        <Text fontSize={"lg"} fontWeight={500} display={{ base: "none", md: "block" }}>
                            BFF Ship 🔥
                        </Text>

                        <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <LuSun size={20} />}</Button>
                        <CreateUserModel />
                    </Flex>
                </Flex>
            </Box>
        </Container>
    );
};

export default Navbar;
