"use client";
import getAllOrdersAction from "@/actions/allOrders.action";
import { OrderSkeleton } from "@/components/skeleton/OrderSkeleton";
import { Order } from "@/Interfaces/allOrdersInterfaces";
import { formatCurrency } from "@/utilities/formateCurrency";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);



  // *********************************************************

  useEffect(() => {
    const cartOwnerId = localStorage.getItem("cartOwnerId");
    console.log(cartOwnerId);
    if (!cartOwnerId) {
      console.error(" No cartOwnerId found in localStorage");
      setIsLoading(false);
      return;
    }

    const handleGetAllOrders = async () => {
      try {
        const data = await getAllOrdersAction(cartOwnerId);
        console.log("🚀 ~ handleGetAllOrders ~ data:", data);
        setAllOrders(data);
      } catch (error) {
        console.error(" Fetching Orders Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetAllOrders();
  }, []);

  // *********************************************************

  function getOrderStatus(order: Order) {
    if (!order.isPaid) {
      return {
        text: "Pending Payment",
        style: "bg-red-100 text-red-700",
      };
    }

    if (order.isPaid && !order.isDelivered) {
      return {
        text: "Processing",
        style: "bg-yellow-100 text-yellow-700",
      };
    }

    if (order.isPaid && order.isDelivered) {
      return {
        text: "Delivered",
        style: "bg-green-100 text-green-700",
      };
    }
  }

  // Loading
  if (isLoading) {
    return (
      <>
        <OrderSkeleton />
        <OrderSkeleton />
        <OrderSkeleton />
      </>
    );
  }

  // *********************************************************

  // no orders
  if (!allOrders || allOrders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-gray-500">
        <p className="mb-3 text-lg font-medium">No orders found</p>
      </div>
    );
  }

  // *********************************************************

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {allOrders.map((order) => {
          const status = getOrderStatus(order);

          return (
            <div
              key={order._id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              {/* ================= HEADER ================= */}

              <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
                {/* Order Info */}
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p className="font-semibold text-gray-800">
                    #{order._id.slice(-8)}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Date</p>
                  <p className="font-semibold text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Items</p>
                  <p className="font-semibold text-gray-800">
                    {order.cartItems.length} items
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(order.totalOrderPrice)}
                  </p>
                </div>
              </div>

              {/*********************** Payment Method *********************** */}

              <div className="flex flex-wrap gap-3 mb-4">
                {/* Status */}
                <span
                  className={`px-3 py-1 text-sm rounded-full ${status?.style}`}
                >
                  {status?.text}
                </span>

                {/* Payment */}
                <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
                  {order.paymentMethodType === "card"
                    ? "Online Payment"
                    : "Cash on Delivery"}
                </span>
              </div>

              <hr className="mb-5" />

              {/*************************** ITEMS ***************************/}

              <div className="space-y-4">
                {order.cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex items-center gap-4"
                  >
                    <Image
                      src={item.product.imageCover || "/product.png"}
                      alt={item.product.title}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                      
                    />

                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.product.title}
                      </p>

                      <p className="text-sm text-gray-400">
                        Quantity: {item.count}
                      </p>
                    </div>

                    <p className="font-semibold text-gray-700">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
