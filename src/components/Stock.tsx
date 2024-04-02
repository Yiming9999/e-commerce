import { Badge } from "@chakra-ui/react";

interface Props {
  stock: number;
}

const Stock = ({ stock }: Props) => {
  let message = "";
  let color = "red";

  // Show different badge based on stock
  if (stock < 10) {
    message = `Only ${stock} in stock!!!`;
  } else if (stock < 20) {
    color = "yellow";
    message = `${stock} remaining`;
  } else {
    return null;
  }
  return (
    <Badge colorScheme={color} fontSize="14px" paddingX={2} borderRadius="4px">
      {message}
    </Badge>
  );
};

export default Stock;
