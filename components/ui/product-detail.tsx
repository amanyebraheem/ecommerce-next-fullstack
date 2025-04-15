

// 'use client';

// import Image from "next/image";
// import { Button } from "./button";
// import { useCartStore } from "@/store/cart-store";

// interface ProductDetailProps {
//   product: {
//     id: string;
//     name: string;
//     description: string | null;
//     images: string[];
//     default_price: {
//       unit_amount: number | null;
//       currency: string;
//     };
//   };
// }

// export const ProductDetail = ({ product }: ProductDetailProps) => {


// const {items , addItem , removeItem } = useCartStore()
//   const price = product.default_price;
// const cartItem = items.find((item) => item.id === product.id);
// const quantity = cartItem ? cartItem.quantity : 0;

// const onAddItem = () => {

// addItem({
// id: product.id,
// name: product.name,
// price: price.unit_amount as number ,
// imageUrl:product.images ? product.images[0]: null ,
// quantity: 1,

// })

// }


//   return (
//     <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center  ">
//       {product.images && product.images[0] && (
//         <div className="relative w-full h-80 md:w-1/2 rounded-lg overflow-hidden">
//           <Image
//             src={product.images[0]}
//             alt={product.name}
//             fill
//             className="transition duration-300  hover:opacity-90"
//           />
//         </div>
//       )}

//       <div className="md:w1/2 ">
//         <h1 className="text-3x1 font-bold mb-5" >{product.name}</h1>
//         {product.description && <p>{product.description}</p>}
//         {price?.unit_amount && (
//           <p className="text-xl text-black mb-4">
//             ${(price.unit_amount / 100).toFixed(2)}
            
//           </p>
//         )}
//         <div className="flex items-center space-x-4 ">
//             <Button variant="outline" onClick={()=> removeItem(product.id)}>-</Button>
// <span className="text-lg font-semibold">{quantity}</span>
//             <Button onClick={onAddItem}>+</Button>
//         </div>
//       </div>
//     </div>
//   );
// };

'use client';

import Image from "next/image";
import { Button } from "./button";
import { useCartStore } from "@/store/cart-store";

interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    description: string | null;
    images: string[];
    default_price: {
      unit_amount: number | null;
      currency: string;
    };
  };
}

export const ProductDetail = ({ product }: ProductDetailProps) => {
  const { items, addItem, removeItem } = useCartStore();

  const price = product.default_price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount ?? 0,
      imageUrl: product.images?.[0] ?? '', // ✅ لازم يكون string دايمًا
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
      {product.images && product.images[0] && (
        <div className="relative w-full h-80 md:w-1/2 rounded-lg overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder.png'} // ✅ لازم string
            alt={product.name || 'Product image'}         // ✅ لازم string
            fill
            className="transition duration-300 hover:opacity-90 object-cover"
          />
        </div>
      )}

      <div className="md:w-1/2">
        <h1 className="text-3xl font-bold mb-5">{product.name}</h1>

        {product.description && (
          <p className="mb-4 text-gray-700">{product.description}</p>
        )}

        {price?.unit_amount !== null && (
          <p className="text-xl text-black mb-4">
            ${(price.unit_amount / 100).toFixed(2)}{" "}
            <span className="uppercase">{price.currency}</span>
          </p>
        )}

        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => removeItem(product.id)}>-</Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button onClick={onAddItem}>+</Button>
        </div>
      </div>
    </div>
  );
};
