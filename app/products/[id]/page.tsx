

import { ProductDetail } from "@/components/ui/product-detail";
import { stripe } from "@/lib/stripe";


export default async function ProductsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const {id} = await params
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

 


const plainProduct = JSON.parse(JSON.stringify(product));
  return <ProductDetail product={plainProduct} />;
}
