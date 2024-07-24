import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { BiEditAlt } from "react-icons/bi";

const EditModal = (user) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button onClick={onOpen} variant="ghost" colorScheme="blue" aria-label="See menu" size={"sm"}>
                <BiEditAlt size={20} />
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> Add my new 😆 </ModalHeader>
                    <ModalCloseButton />

                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            {/* Left */}
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder="Kudamii"></Input>
                            </FormControl>

                            {/* Right */}
                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="Software Engineer"></Input>
                            </FormControl>
                        </Flex>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea resize={"none"} overflowY={"hidden"} placeholder="He nice, but is SIMP!"></Textarea>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditModal;
