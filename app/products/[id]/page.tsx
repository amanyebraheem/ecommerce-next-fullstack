

import { ProductDetail } from "@/components/ui/product-detail";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export default async function ProductsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await stripe.products.retrieve(params.id, {
    expand: ["default_price"],
  });

  // نسلسل البيانات لتكون قابلة للنقل إلى Client Component
  const price = product.default_price as Stripe.Price;

  const serializedProduct = {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images,
    default_price: {
      unit_amount: price.unit_amount,
      currency: price.currency,
    },
  };
const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}
