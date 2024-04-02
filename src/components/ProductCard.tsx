import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  Stack,
} from "@chakra-ui/react";
import Stock from "./Stock";
import Rating from "./Rating";
import { Product } from "../hooks/useProducts";
import { CartItem } from "./ShoppingCart";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { ProductDescription } from "./ProductDescription";
import Delivery from "./Delivery";

interface Props {
  product: Product;
  quantity: number;
  addToCart: (userId: number, product: CartItem) => Promise<void>;
}

// Fix length
const ProductCard = ({ product, addToCart }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Users can click on the left and right buttons to navigate through the images
  const nextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const originalPrice = product.price;
  const discountedPrice =
    originalPrice * (1 - product.discountPercentage / 100);

  return (
    <Card>
      <Box width="full" height="350px" position="relative" overflow="hidden">
        {product.images && product.images.length > 0 && (
          <>
            <Image
              src={product.images[currentImageIndex]}
              alt={product.title}
              objectFit="cover"
              width="full"
              height="full"
              position="absolute"
            />
            <ChevronLeftIcon
              boxShadow="base"
              borderRadius="full"
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              onClick={prevImage}
            ></ChevronLeftIcon>
            <ChevronRightIcon
              boxShadow="base"
              borderRadius="full"
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              onClick={nextImage}
            ></ChevronRightIcon>
          </>
        )}
      </Box>
      <CardBody>
        <Stack spacing={3}>
          <HStack justifyContent="space-between">
            <Rating rating={product.rating} />
            <Stock stock={product.stock} />
          </HStack>
          <Stack>
            <Heading fontSize="2xl">{product.title}</Heading>
            <Text fontSize="md" color="gray.500">
              {product.brand}
            </Text>
          </Stack>
          <Text fontWeight="bold">
            {product.discountPercentage > 0 ? (
              <>
                <Text
                  color="red.500"
                  as="span"
                  textDecoration="line-through"
                  marginRight={2}
                >
                  ${originalPrice.toFixed(2)}
                </Text>
                <Text as="span" color="green.500">
                  ${discountedPrice.toFixed(2)}
                </Text>
              </>
            ) : (
              <>${originalPrice.toFixed(2)}</>
            )}
          </Text>
          <ProductDescription description={product.description} />
        </Stack>
      </CardBody>
      <Delivery price={product.price} />
      <Button
        colorScheme="yellow"
        onClick={() => addToCart(1, { ...product, quantity: 1 })}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
