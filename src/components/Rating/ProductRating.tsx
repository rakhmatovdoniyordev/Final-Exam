import  { useState, useEffect } from 'react';
import { Stack, Rating } from '@mui/material';

const ProductRating = ({ product }: { product: { star: number | null } }) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    if (product?.star !== undefined) {
      setRating(product.star);
    }
  }, [product?.star]);

  return (
    <Stack spacing={1}>
      <Rating
        name="half-rating-read"
        value={rating}
        precision={0.1}
        readOnly
      />
    </Stack>
  );
};

export default ProductRating;
