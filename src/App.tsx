import { Box, Flex, Grid, GridItem, Show, Spacer } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import CategoryList from "./components/CategoryList";
import { useState } from "react";
import ShoppingCart, { CartItem } from "./components/ShoppingCart";
import { addToCart, handleDeleteItem, onAdd, onRemove } from "./utils/CartUtil";
import { Product } from "./hooks/useProducts";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (product: Product) => {
    addToCart(product, setItems);
  };

  const deleteProduct = (id: number) => {
    handleDeleteItem(id, setItems);
  };

  const addOne = (id: number) => {
    onAdd(id, setItems);
  };

  const removeOne = (id: number) => {
    onRemove(id, setItems);
  };

  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: `"nav nav" "aside main"`,
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav">
        <Flex
          w="full"
          alignItems="center"
          justifyContent="space-between"
          paddingX={5}
        >
          <Box>
            <NavBar onSearch={(searchText) => setSearchText(searchText)} />
          </Box>
          <Spacer />
          <Box>
            <ShoppingCart
              items={items}
              onDelete={deleteProduct}
              onAdd={addOne}
              onRemove={removeOne}
            />
          </Box>
        </Flex>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <CategoryList
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <ProductGrid
          selectedCategory={selectedCategory}
          searchText={searchText}
          addToCart={add}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
