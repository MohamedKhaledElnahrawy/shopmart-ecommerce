export interface Order {
  _id: string;
  createdAt: string;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  cartItems: CartItem1[];
}
interface CartItem1 {
  product: {
    title: string;
    imageCover: string;
    id?:string
  };
  count: number;
  price: number;
}