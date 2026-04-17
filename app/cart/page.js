'use client';

import { useCart } from '@/app/context/cartcontext';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  // Calculate total
  const totalPrice = cartItems.reduce(
  (total, item) => total + Number(item.price),
  0
);

  return (
    <div className="min-h-screen bg-[#F2E9E4] p-6">

      <h1 className="text-4xl font-extrabold text-[#7B2CBF] mb-8 text-center">
        Your Cart 🛒
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-700">
          Your cart is empty 😢
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">

          {/* LEFT SIDE - ITEMS */}
          <div className="md:col-span-2 space-y-4">

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition flex gap-4"
              >
                <img
                  src={item.image}
                  className="w-28 h-28 object-cover rounded"
                />

                <div className="flex flex-col flex-grow">
                  <h2 className="font-bold text-lg">
                    {item.name}
                  </h2>

                  <p className="text-gray-700">
                    Size: {item.size || 'N/A'}
                  </p>

                  <p className="text-[#7B2CBF] font-bold">
                    ₹{item.price}
                  </p>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-3 text-sm bg-red-100 text-red-600 px-3 py-1 rounded-lg hover:bg-red-200 transition w-fit"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

          </div>

          {/* RIGHT SIDE - SUMMARY */}
          <div className="bg-white p-6 rounded-2xl shadow-lg h-fit border border-gray-200">
            <h2 className="text-xl font-bold mb-4">
              Price Details
            </h2>

            <p className="flex justify-between mb-2">
              <span>Total Items</span>
              <span>{cartItems.length}</span>
            </p>

            <p className="flex justify-between mb-4">
              <span>Total Price</span>
              <span>₹{totalPrice}</span>
            </p>

            <button className="w-full bg-[#FFD166] text-[#7B2CBF] py-3 rounded-xl font-bold hover:scale-105 transition">
              Proceed to Payment
            </button>
          </div>

        </div>
      )}
    </div>
  );
}