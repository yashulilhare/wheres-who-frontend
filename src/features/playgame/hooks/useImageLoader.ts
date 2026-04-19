import { useEffect, useState } from "react";

const useImageLoader = (imgSources: string[] | null) => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    if (!imgSources) return;
    let isMounted = true;

    const promises = imgSources.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(promises)
      .then(() => {
        if (isMounted) setImagesLoaded(true);
      })
      .catch((err) => {
        console.error("Failed to load images", err);
      });

    return () => {
      isMounted = false;
    };
  }, [imgSources]);
  return imagesLoaded;
};

export default useImageLoader;
