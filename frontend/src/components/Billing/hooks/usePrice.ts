import { useCallback, useState } from "react";

export function usePrice() {
  const [price, setPrice] = useState<number | undefined>(undefined);

  const addPrice = useCallback((priceToAdd: number) => {
    setPrice((prevPrice) => (prevPrice ? prevPrice + priceToAdd : prevPrice));
  }, []);

  const removePrice = useCallback((priceToRemove: number) => {
    setPrice((prevPrice) =>
      prevPrice
        ? prevPrice > priceToRemove
          ? prevPrice - priceToRemove
          : prevPrice
        : prevPrice
    );
  }, []);

  const setPriceValue = useCallback((price: number) => {
    setPrice(price);
  }, []);

  return { price, addPrice, removePrice, setPriceValue };
}
