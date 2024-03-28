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

interface Props {
  product: Product;
  addToCart: (product: Product) => void;
}

const ProductCard = ({ product, addToCart }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);

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

  const toggleDescription = () => {
    setDescriptionVisible((prev) => !prev);
  };

  const originalPrice = product.price;
  const discountedPrice =
    originalPrice * (1 - product.discountPercentage / 100);

  return (
    <Card>
      <Box width="full" height="250px" position="relative" overflow="hidden">
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
            <Button
              position="absolute"
              left="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={prevImage}
            ></Button>
            <Button
              position="absolute"
              right="0"
              top="50%"
              transform="translateY(-50%)"
              onClick={nextImage}
            ></Button>
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
                <Text as="span" textDecoration="line-through" marginRight={2}>
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
          {product.discountPercentage > 0 && (
            <Text color="red.500">Save {product.discountPercentage}%!</Text>
          )}
          {/* Toggle Button */}
          <Button onClick={toggleDescription}>
            {isDescriptionVisible ? "Hide Description" : "Show Description"}
          </Button>
          {isDescriptionVisible && (
            <Text isTruncated>{product.description}</Text>
          )}
        </Stack>
      </CardBody>
      <Button
        colorScheme="teal"
        variant="ghost"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </Button>
    </Card>
  );
};

export default ProductCard;
