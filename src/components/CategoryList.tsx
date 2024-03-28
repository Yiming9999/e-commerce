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
      {categories.map((category, index) => (
        <ListItem key={index} paddingY="5px">
          <Button
            fontWeight={selectedCategory === category ? "bold" : "normal"}
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
