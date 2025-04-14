

// "use client"
// import Link from 'next/link';

// import {ShoppingCartIcon , Bars3Icon , XMarkIcon} from "@heroicons/react/24/outline"

// import { useCartStore } from '@/store/cart-store';
// import { useState ,useEffect} from 'react';
// import { Button } from '@/components/ui/button';

// const Navbar = () => {
// const [mobileOpen , setMobileOpen] useState<boolean>(false);
//     const {items} = useCartStore()
//     const cartCount = items.reduce((acc, item) => acc + item.quantity, 0 );

// useEffect(()=>{

// const handleResize = () => {

//     if (window.innerwidth >=  768){
// setMobileOpen(false)
//     }
   
// };
// window.addEventListener("resize" ,handleResize);
// return () => window.removeEventListener("resize" , handleResize)
//  } , [])
//     return (
//         <div>
//            <nav className='sticky top-0 z-50 bg-white shadow '>
// <div className='container mx-auto flex items-center justify-between px-4 py-4' >

// <Link href="/" className='hover:text-blue-600 '>

// my Ecommerce
// </Link>


// <div className='hidden md:flex space-x-6' >
// <Link href="/">Home</Link>
// <Link href="/products"  className='hover:text-blue-600'>Products</Link>
// <Link href="/checkout" className='hover:text-blue-600'>Checkout</Link>

// </div>

// <div className='flex items-center space-x-4'>

// <Link href="/checkout">

// <ShoppingCartIcon />
// {
//     cartCount > 0 && (

// <span>{cartCount}</span>
//     )
// }
// </Link>
// <Button variant="ghost" onClick={() => setMobileOpen((prev) => !prev)} >

//     {mobileOpen ? (<XMarkIcon />) : <Bars3Icon />}
// </Button>

// </div>
// </div>
// {mobileOpen && (

// <nav>

// <ul>
//     <li>
//         <Link href={"/"}>Home</Link>

//     </li>

//     <li>
//         <Link href={"/products"}>Products</Link>

//     </li>

//     <li>
//         <Link href={"/checkout"}>Checkout</Link>

//     </li>
// </ul>

// </nav>

// )}
//            </nav>
//         </div>
//     );
// }

// export default Navbar;

"use client";

import Link from 'next/link';
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCartStore } from '@/store/cart-store';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="hover:text-blue-600 text-lg font-bold">
          my Ecommerce
        </Link>

        {/* Links for medium and up screens */}
        <div className="hidden md:flex space-x-6">
          <Link href="/">Home</Link>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <Link href="/checkout" className="hover:text-blue-600">Checkout</Link>
        </div>

        {/* Cart and menu icon */}
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <Button variant="ghost" onClick={() => setMobileOpen(prev => !prev)}>
            {mobileOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-2">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/products">Products</Link></li>
            <li><Link href="/checkout">Checkout</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
