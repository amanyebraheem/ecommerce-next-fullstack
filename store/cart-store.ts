
import { create } from "zustand";
import { persist } from "zustand/middleware";

// تعريف نوع بيانات العنصر داخل السلة
export interface CartItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string | null;
  quantity: number;
}

// تعريف شكل المتجر الخاص بالسلة
interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

// إنشاء الحالة باستخدام zustand و persist لحفظها في localStorage
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === item.id);

          if (existing) {
            // إذا كان العنصر موجودًا، يتم تحديث الكمية
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          // إذا لم يكن موجودًا، يتم إضافته للسلة
          return {
            items: [...state.items, item],
          };
        }),


removeItem: (id)=> set((state) =>{

return {items: state.items.map((item) => item.id === id ? {...item, quantity: item.quantity -1} : item


).filter((item) => item.quantity > 0 ),



}

}),






clearCart: () => set((state) =>{

    return{ items: []};
}),

    }),
    {
      name: "cart", // اسم المفتاح في localStorage
    }
  )
);
