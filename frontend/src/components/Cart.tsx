import { LuShoppingCart } from "react-icons/lu";
import Profile from "./Profile";

const Cart = () => {
  return (
    <>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <LuShoppingCart className="h-8 w-8" />
          <p className="text-xl">Cart</p>
        </div>

        <div>
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Cart;
