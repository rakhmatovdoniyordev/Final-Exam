import React, { useState, useEffect } from "react";
import { Skeleton } from "@mui/material";

interface ImageGalleryProps {
  urls: string[] | undefined;
  loading: boolean;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ urls, loading }) => {
  const [selectedImage, setSelectedImage] = useState<string>("/placeholder.svg");

  useEffect(() => {
    if (urls && urls.length > 0) {
      setSelectedImage(urls[0]);
    }
  }, [urls]);

  return (
    <div className="flex flex-col gap-5 w-full max-[768px]:flex-col max-[768px]:gap-3 md:flex-row">
      <div className="flex flex-col gap-3 w-full md:w-1/4 max-[768px]:flex-row max-[768px]:w-full">
        {loading ? (
          <>
            <Skeleton variant="rectangular" width={100} height={100} className="mb-3" />
            <Skeleton variant="rectangular" width={100} height={100} className="mb-3" />
            <Skeleton variant="rectangular" width={100} height={100} className="mb-3" />
          </>
        ) : (
          urls && urls.length > 0 ? (
            urls.map((url, index) => (
              <div
                key={index}
                className={`w-24 h-24 md:w-40 md:h-40 rounded-lg overflow-hidden cursor-pointer
                  transition-all duration-200 hover:opacity-90
                  ${selectedImage === url ? "ring-2 ring-black" : "ring-1 ring-gray-200"}`}
                onClick={() => setSelectedImage(url)}
              >
                <img
                  src={url || "/placeholder.svg"}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))
          ) : (
            <p>Loading images...</p>
          )
        )}
      </div>
      <div className="flex-1 bg-gray-50 rounded-xl overflow-hidden h-64 md:h-auto max-[768px]:h-48">
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height="100%" className="w-full h-full" />
        ) : (
          <img
            src={selectedImage}
            alt="Selected product view"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};
