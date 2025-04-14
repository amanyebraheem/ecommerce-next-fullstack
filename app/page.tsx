

import { Carousel } from "@/components/carousel";
import { Button } from "@/components/ui/button";
import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="rounded-lg bg-neutral-100 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 items-center justify-items-center gap-10 px-6 sm:px-12 md:grid-cols-2">
          
          {/* Text Content */}
          <div className="max-w-lg space-y-6 text-center md:text-left">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Welcome to My Ecommerce
            </h2>
            <p className="text-lg text-neutral-600">
              Discover the latest products at the best prices.
            </p>

            <Button
              asChild
              variant="default"
              className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-black text-white text-lg font-semibold hover:bg-gray-800 transition duration-300"
            >
              <Link href="/products">
                Browse All Products
              </Link>
            </Button>
          </div>

          {/* Hero Image */}
          {products.data[0]?.images[0] && (
            <Image
              alt="Banner Image"
              width={500}
              height={500}
              className="rounded-xl shadow-lg object-cover"
              src={products.data[0].images[0]}
            />
          )}
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-12 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h3>
          <Carousel products={products.data} />
        </div>
      </section>
    </div>
  );
}

