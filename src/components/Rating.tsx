import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box } from "@chakra-ui/react";

interface Props {
  rating: number;
}

const Rating = ({ rating }: Props) => {
  // Rating number color
  let color = rating > 4.75 ? "green" : rating > 4.5 ? "yellow" : "red";

  const fullStarts = Math.floor(rating);
  const left = rating - fullStarts;

  // Star color
  const starColor = (i: number) => {
    if (i < fullStarts) {
      return "teal.500";
    } else if (i === fullStarts && left >= 0.75) {
      return "teal.500";
    } else if (i === fullStarts && left >= 0.5) {
      return "yellow.500";
    } else if (i === fullStarts && left >= 0.25) {
      return "red.500";
    } else {
      return "gray.300";
    }
  };

  return (
    <Box>
      <Badge
        colorScheme={color}
        fontSize="14px"
        paddingX={2}
        borderRadius="4px"
      >
        {rating}
      </Badge>
      {/* Display 5 stars */}
      {Array(5)
        .fill("")
        .map((_, i) => (
          <StarIcon key={i} color={starColor(i)} />
        ))}
    </Box>
  );
};

export default Rating;
