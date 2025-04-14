

'use client'

import React , {useEffect} from "react";
import { useCartStore } from "@/store/cart-store";

import Link from "next/link";

export default function  SuccessPage(){


const {clearCart} = useCartStore();

useEffect(() => {
    clearCart();
  
}, [clearCart]);


return <div>

<h1>Payment successful !</h1>
<p> Thank you for your purchase. Your order is being processed.</p>

<Link href={"/products"}>
Countinue Shopping 
</Link>

</div>

}