"use client"
import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import Image from "next/image";
import { Button } from "./button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card>
        {product.images && product.images[0] && (
          <div className="relative w-full h-80">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              className="transition-opacity duration-500 ease-in-out object-cover hover:opacity-90  "
            />
          </div>
        )}

        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
        </CardHeader>
<CardContent>
{
product.description && (
    <p className="text-gray-600 text-sm mb-2">
        {product.description}</p>
)}

</CardContent>
        <CardContent>
          {price?.unit_amount && (
            <p className="text-xl text-black">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <Button className=" mt-4 bg-black text-white">
            View Details 
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
