

'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";


export default function CheckoutPage() {
    const { items, removeItem, addItem } = useCartStore();

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if ( items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 text-center">
                <h1  className="text-3xl font-bold mb-4">Your Cart is Empty.</h1>
            </div>
        );
    }

    return (
        <div>
            <h1>Checkout</h1>
            <Card >
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul>
                        {items.map((item, key) => (
                            <li key={key} className="flex justify-between items-center my-4">
                                <div>
                                    <span>{item.name}</span>
                                    <span className="ml-4">
                                        ${((item.price * item.quantity) / 100).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="outline" onClick={() => removeItem(item.id)}>-</Button>
                                    <span className="text-lg font-semibold">{item.quantity}</span>
                                    <Button onClick={() => addItem({ ...item, quantity: 1 })}>+</Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                <div>
                <span className="text-black font-bold text-2xl"> Tota: </span>     ${(total /100).toFixed(2)}
                </div>
                </CardContent>
            </Card>
            <form action={checkoutAction} className="max-w-md ">
           
<input  type="hidden" name="items" value={JSON.stringify(items)}/>
               <Button type="submit"    variant={"default"} className="mt-4 ">Proceed to payment</Button>


       
            </form>
        </div>
    );
}
