import { Button, List, ListItem, Spinner } from "@chakra-ui/react";
import useCategories from "../hooks/useCategories";

interface Props {
  onSelectCategory: (category: string) => void;
  selectedCategory: string;
}

const CategoryList = ({ onSelectCategory, selectedCategory }: Props) => {
  const { categories, error, isLoading } = useCategories();

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <List>
      <ListItem key={0} paddingY="5px">
        <Button
          fontWeight={selectedCategory === "" ? "bold" : "normal"}
          onClick={() => onSelectCategory("")}
          fontSize="lg"
          variant="link"
        >
          All Products
        </Button>
      </ListItem>
      {categories.map((category, index) => (
        <ListItem key={index} paddingY="5px">
          <Button
            fontWeight={selectedCategory === category ? "bold" : "normal"} // Highlight the selected category
            onClick={() => onSelectCategory(category)}
            fontSize="lg"
            variant="link"
          >
            {category}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

export default CategoryList;
