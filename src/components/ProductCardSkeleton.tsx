import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Card width="300px" borderRadius={10} overflow="hidden">
      <Skeleton height="250px" width={50} />
      <CardBody>
        <SkeletonText mt="4" noOfLines={4} spacing="4" />
      </CardBody>
    </Card>
  );
};

export default ProductCardSkeleton;
