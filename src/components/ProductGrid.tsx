import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import ProductCardContainer from "./ProductCardContainer";
import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";
import useProducts from "../hooks/useProducts";
import { CartItem } from "./ShoppingCart";

interface Props {
  selectedCategory: string;
  searchText: string;
  quantity: number;
  addToCart: (userId: number, product: CartItem) => Promise<void>;
}

const ProductGrid = ({
  selectedCategory,
  searchText,
  addToCart,
  quantity,
}: Props) => {
  const { products, error, isLoading } = useProducts(
    selectedCategory,
    searchText
  );

  // If there are no products to display
  if (!isLoading && products.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text fontSize="xl" fontWeight="bold">
          No products found for "{searchText}"
        </Text>
        <Text color="gray.600">Search something else.</Text>
      </Box>
    );
  }

  // Show skeletons when loading
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error) return <div>{error}</div>;

  return (
    <SimpleGrid
      columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      padding="10px"
      spacing={6}
    >
      {isLoading &&
        skeletons.map((skeleton) => (
          <ProductCardContainer key={skeleton}>
            <ProductCardSkeleton />
          </ProductCardContainer>
        ))}
      {products.map((product) => (
        <ProductCardContainer key={product.id}>
          <ProductCard
            product={product}
            addToCart={addToCart}
            quantity={quantity}
          />
        </ProductCardContainer>
      ))}
    </SimpleGrid>
  );
};

export default ProductGrid;
