// 'use server';

// import { stripe } from "@/lib/stripe";
// import { CartItem } from "@/store/cart-store"
// import { redirect } from "next/navigation";


// export const checkoutAction = async (formData: FormData):Promise<volid> =>   {


// const itemsJson = formData.get("items") as string

// const items = JSON.parse(itemsJson)
// const line_items = items.map((item: CartItem) => ({

// price_data: {

// currency: "cad" ,
// product_data: {name: item.name},
// unit_amount: item.price

// },

// quantity: item.quantity,



// }));


// const session = await stripe.checkout.sessions.create({

//     payment_method_types: ["card"],
//     line_items,
//     mode: "payment",
//     success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//     cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,

// })
// redirect(session.url!)


// }

'use server';

import { stripe } from "@/lib/stripe";
import { CartItem } from "@/store/cart-store";

export const checkoutAction = async (formData: FormData): Promise<{ url: string }> => {
  const itemsJson = formData.get("items");

  if (!itemsJson || typeof itemsJson !== "string") {
    throw new Error("Invalid cart data");
  }

  const items: CartItem[] = JSON.parse(itemsJson);

  const line_items = items.map((item) => ({
    price_data: {
      currency: "cad",
      product_data: { name: item.name },
      unit_amount: item.price,
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  return { url: session.url! };
};

