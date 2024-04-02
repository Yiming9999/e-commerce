import { Text } from "@chakra-ui/react";

interface Props {
  price: number;
}

const Delivery = ({ price }: Props) => {
  let message = "";

  // Show different badge based on stock
  if (price > 100) {
    message = `FREE delivery`;
  }

  return <Text>{message}</Text>;
};

export default Delivery;
