

"use client";
import Stripe from "stripe";
import { ProductCard } from "./product-card";
import { useState } from "react";

interface Props {
  products: Stripe.Product[];
}

export const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredProduct = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = product.name.toLowerCase().includes(term);
    const descriptionMatch = product.description
      ? product.description.toLowerCase().includes(term)
      : false;

    return nameMatch || descriptionMatch;
  });

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search product..."
          className="w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:border-gray-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProduct.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </div>
  );
};
