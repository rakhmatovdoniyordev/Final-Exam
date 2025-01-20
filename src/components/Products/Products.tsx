import { Stack, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { IProducts } from "../../types";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductRating from "../Rating/ProductRating";

const API_URL = "https://6777b7b280a79bf91902b4ff.mockapi.io/clothes";

const Products = () => {
  const { data, isLoading } = useQuery<IProducts[] | undefined>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

  return (
    <section>
      <div className="container">
        <div className="text-center pt-12 pb-6">
          <h3 className="text-[48px] integral font-extrabold">NEW ARRIVALS</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-sm"
                >
                  <div className="relative bg-[#F0EEED] rounded-lg flex items-center justify-center overflow-hidden w-full h-60">
                    <Skeleton variant="rectangular" className="w-full h-full" />
                  </div>
                  <div className="p-4 space-y-2">
                    <Skeleton variant="text" className="w-full h-6" />
                    <Skeleton variant="text" className="w-3/4 h-6" />
                    <Skeleton variant="rectangular" className="w-1/2 h-8" />
                  </div>
                </div>
              ))
            : data?.map((product) => (
                <div key={product.id}>
                  <motion.div
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative bg-[#F0EEED] rounded-lg flex items-center justify-center overflow-hidden w-full h-60">
                      <Link to={`/detail/${product.id}`}>
                        {product.urls && product.urls.length > 0 ? (
                          <img
                            src={product.urls[0]}
                            alt={product.title}
                            className="object-cover hover:opacity-90 transition-opacity duration-300"
                          />
                        ) : (
                          <></>
                        )}
                      </Link>
                    </div>

                    <div className="p-4 space-y-2">
                      <h3 className="text-[20px] font-bold text-gray-900 satoshi">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-1.5">
                        <Stack spacing={1}>
                          <ProductRating product={product} />
                        </Stack>
                        <span className="text-sm text-gray-500">
                          {product?.star}/5
                        </span>
                      </div>

                      <div className="font-bold text-[24px] text-gray-900 satoshi">
                        ${product.price}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
