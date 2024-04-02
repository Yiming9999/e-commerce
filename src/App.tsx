import { Box, Flex, Grid, GridItem, Show, Spacer } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import ProductGrid from "./components/ProductGrid";
import CategoryList from "./components/CategoryList";
import { useState } from "react";
import ShoppingCart from "./components/ShoppingCart";
import useCarts from "./hooks/useCarts";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchText, setSearchText] = useState("");
  const { cartInfo, addToCart, deleteItem, addOne, removeOne } = useCarts();

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
    setSelectedCategory("");
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setSearchText("");
  };

  const clearAll = () => {
    setSelectedCategory("");
    setSearchText("");
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
            <NavBar
              onSearch={(searchText) => handleSearch(searchText)}
              onLogoClick={() => {
                clearAll();
              }}
              onChange={(searchText) => setSearchText(searchText)}
              searchText={searchText}
            />
          </Box>
          <Spacer />
          <Box>
            <ShoppingCart
              items={cartInfo.items}
              onDelete={deleteItem}
              onAdd={addOne}
              onRemove={removeOne}
              total={cartInfo.total}
              discountedTotal={cartInfo.discountedTotal}
              userId={cartInfo.userId}
              id={cartInfo.id}
              totalProducts={cartInfo.totalProducts}
              totalQuantity={cartInfo.totalQuantity}
            />
          </Box>
        </Flex>
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" paddingX={5}>
          <CategoryList
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => handleCategorySelect(category)}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <ProductGrid
          selectedCategory={selectedCategory}
          searchText={searchText}
          addToCart={addToCart}
          quantity={0}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
