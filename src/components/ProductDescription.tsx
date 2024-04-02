import {
  Text,
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

interface Props {
  description: string;
}

export const ProductDescription = ({ description }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box cursor="pointer" textDecoration="underline" onClick={onOpen}>
        <Text isTruncated noOfLines={1} title="Click to read more">
          {description}
        </Text>
      </Box>
      {/* Show complete description in a modal when cliced */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Product Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="3xl">{description}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
