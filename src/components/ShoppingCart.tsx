import {
  Box,
  Button,
  Image,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Product } from "../hooks/useProducts";
import { useState } from "react";

export interface CartItem extends Product {
  quantity: number;
}

interface Props {
  items: CartItem[];
  onDelete: (id: number) => void;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}

const ShoppingCart = ({ items, onDelete, onAdd, onRemove }: Props) => {
  const [isCartVisible, setCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalSaving = items.reduce(
    (acc, item) =>
      acc + (item.price * item.quantity * item.discountPercentage) / 100,
    0
  );

  return (
    <Box position="relative">
      {totalQuantity > 0 && (
        <Box
          position="absolute"
          top="-5px"
          right="-5px"
          bg="red.500"
          borderRadius="full"
          color="white"
          textAlign="center"
          px={1}
          py={1}
          fontSize="sm"
        >
          {totalQuantity}
        </Box>
      )}
      <Box cursor="pointer" onClick={toggleCartVisibility}>
        <Image src="src/assets/cart.webp" alt="Cart" boxSize="50px" />
      </Box>
      {isCartVisible && (
        <Box width="100%" overflowX="auto">
          {totalQuantity === 0 ? (
            <Box textAlign="center" fontSize="3xl">
              Your cart is empty
            </Box>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Category</Th>
                  <Th>Price</Th>
                  <Th>Discount</Th>
                  <Th>Quantity</Th>
                  <Th>Modify</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items.map((item) => (
                  <Tr key={item.id}>
                    <Td>{item.title}</Td>
                    <Td>{item.category}</Td>
                    <Td>${item.price.toFixed(2)}</Td>
                    <Td>{item.discountPercentage}%</Td>
                    <Td>{item.quantity}</Td>
                    <Td>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => onRemove(item.id)}
                      >
                        -
                      </Button>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => onAdd(item.id)}
                      >
                        +
                      </Button>
                    </Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => onDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              {totalSaving !== 0 && (
                <Tfoot>
                  <Tr>
                    <Td>Total</Td>
                    <Td colSpan={4} color="red">
                      $ {totalAmount.toFixed(2)} (Save ${totalSaving.toFixed(2)}
                      )
                    </Td>
                    <Td>After discount</Td>
                    <Td color="green">
                      $ {(totalAmount - totalSaving).toFixed(2)}
                    </Td>
                  </Tr>
                </Tfoot>
              )}
            </Table>
          )}
        </Box>
      )}
    </Box>
  );
};

export default ShoppingCart;
