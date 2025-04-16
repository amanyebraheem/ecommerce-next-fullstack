

'use client';

import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";
import Stripe from "stripe";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();

  const price = product.default_price as Stripe.Price;

  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  


  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
    
      price: price.unit_amount ? price.unit_amount.toString() : "0",
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };
  




  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative w-full h-60">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-5">{product.name}</h1>

        {product.description && <p>{product.description}</p>}

        {price?.unit_amount && (
          <p className="text-xl text-black mb-4">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => removeItem(product.id)}>
            -
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
};
   