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
  useColorModeValue,
} from "@chakra-ui/react";
import { Product } from "../hooks/useProducts";
import { useState } from "react";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartInformation {
  items: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  id: number;
  onDelete: (cartId: number, productId: number) => Promise<void>;
  onAdd: (userId: number, product: CartItem) => Promise<void>;
  onRemove: (userId: number, product: CartItem) => Promise<void>;
}

const ShoppingCart = ({
  items,
  total,
  discountedTotal,
  totalQuantity,
  onDelete,
  onAdd,
  onRemove,
}: CartInformation) => {
  const [isCartVisible, setCartVisible] = useState(false);

  // Calculate the delivery fee
  const deliveryFee = total > 100 ? 0 : 5.99;
  const finalTotal = discountedTotal + deliveryFee;

  const toggleCartVisibility = () => {
    setCartVisible(!isCartVisible);
  };

  // Different cart background color based on color mode
  const cartBg = useColorModeValue("white", "gray.700");

  return (
    <Box position="fixed" top="20px" right="20px" zIndex="tooltip">
      {totalQuantity > 0 && (
        <Box
          bg="red.500"
          borderRadius="full"
          color="white"
          textAlign="center"
          px={1}
          py={1}
          fontSize="sm"
          position="absolute"
          top="-10px"
          right="-10px"
        >
          {totalQuantity}
        </Box>
      )}
      <Box cursor="pointer" onClick={toggleCartVisibility}>
        <Image src="src/assets/cart.webp" alt="Cart" boxSize="50px" />
      </Box>
      {isCartVisible && (
        <Box
          position="absolute"
          right="5px"
          mt="70px"
          maxW="2000px"
          overflowX="auto"
          bg={cartBg}
          boxShadow="md"
          zIndex="dropdown"
        >
          {totalQuantity === 0 ? (
            <Box textAlign="center" fontSize="xl">
              Your cart is empty
            </Box>
          ) : (
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Title</Th>
                  <Th>Price</Th>
                  <Th>Discount</Th>
                  <Th>Quantity</Th>
                  <Th>Modify</Th>
                  <Th>Delete</Th>
                </Tr>
              </Thead>
              <Tbody>
                {items
                  .filter((item) => item.quantity > 0)
                  .map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        {/* Help with accessibility */}
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          boxSize="50px"
                          objectFit="cover"
                        />
                      </Td>
                      <Td>{item.title}</Td>
                      <Td>${item.price.toFixed(2)}</Td>
                      <Td>{item.discountPercentage}%</Td>
                      <Td>{item.quantity}</Td>
                      <Td>
                        {/* Remove one selected item */}
                        <Button
                          colorScheme="green"
                          size="xs"
                          onClick={() => onRemove(1, item)}
                        >
                          -
                        </Button>
                        {/* Add one more selected item */}
                        <Button
                          colorScheme="green"
                          size="xs"
                          onClick={() => onAdd(1, item)}
                        >
                          +
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme="red"
                          size="sm"
                          onClick={() => onDelete(1, item.id)}
                        >
                          Delete
                        </Button>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
              {discountedTotal !== 0 && (
                <Tfoot>
                  <Tr>
                    <Td>Total</Td>
                    <Td colSpan={1}>$ {total.toFixed(2)}</Td>
                    <Td>After discount</Td>
                    <Td colSpan={2} color="green">
                      $ {discountedTotal.toFixed(2)}
                    </Td>
                    <Td>Delivery Fee</Td>
                    <Td>
                      {deliveryFee === 0
                        ? "$0.00"
                        : `$${deliveryFee.toFixed(2)}`}
                    </Td>
                  </Tr>
                  <Tr>
                    <Td colSpan={6}>Final Total</Td>
                    <Td color="green.500">$ {finalTotal.toFixed(2)}</Td>
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
