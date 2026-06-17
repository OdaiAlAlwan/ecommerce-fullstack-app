
import { useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { GrSubtractCircle } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { FaSmileWink, FaSmile } from "react-icons/fa";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Delete_Cart,
  Delete_ItemAtCart,
  GETLogged_User_ProductCart,
  Update_CartItemQuantity,
} from "../../rtk/slices/Cart-slice";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.data);

  useEffect(() => {
    if (isLogin) {
      dispatch(GETLogged_User_ProductCart());
    }
  }, [dispatch, isLogin]);

  const CleanCart = async () => {
    try {
      await dispatch(Delete_Cart()).unwrap();
      await dispatch(GETLogged_User_ProductCart());
      toast.success("Cart cleaned successfully");
    } catch (error) {
      toast.error("Failed to clean cart");
    }
  };

  const deleteItemById = async (id) => {
    try {
      await dispatch(Delete_ItemAtCart(id)).unwrap();
      await dispatch(GETLogged_User_ProductCart());
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    try {
      await dispatch(
        Update_CartItemQuantity({ itemId: id, quantity: newQuantity })
      ).unwrap();
      // إعادة جلب بيانات السلة بعد التعديل
      dispatch(GETLogged_User_ProductCart());
      toast.success("Quantity updated successfully!");
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold m-10">Shopping Cart</h2>
      <Link to="/" className="flex gap-2 items-center cursor-pointer text-sm m-10">
        <IoChevronBackCircleOutline /> Back
      </Link>

      {isLogin && cartItems?.cartItems?.length > 0 && (
        <div
          className="m-10 flex gap-2 items-center text-xl text-blue-500 cursor-pointer md:text-sm"
          onClick={() => CleanCart()}
        >
          <BsCart3 /> Clean Cart
        </div>
      )}
      {isLogin ? (
        <section className="container w-[90%] grid grid-cols-[70%_30%] lg:grid-cols-[60%_40%] gap-2 items-center h-screen px-[15px] mx-auto md:flex md:justify-center md:flex-col">
          <div className="w-full h-[400px] overflow-y-auto">
            {cartItems?.cartItems?.length > 0 ? (
              cartItems.cartItems.map((el) => {
                if (!el.product) return null;
                const product = el.product;
                return (
                  <div
                    key={el._id}
                    className="h-[150px] mb-3 border-b-2 grid grid-cols-[20%_1fr] w-[90%] md:w-[100%] md:grid-cols-[20%_1fr] md:h-[60px]"
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="h-[150px] md:h-[60px]"
                    />
                    <div className="flex flex-col justify-between items-center md:gap-0 gap-10 h-[100px] md:h-[60px] md:text-[0.5rem]">
                      <div className="flex justify-between items-center md:gap-10 gap-10 w-full">
                        <span>{product.title}</span>
                        <div className="md:text-sm">
                          <button onClick={() => deleteItemById(el._id)}>
                            <IoMdCloseCircle />
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center h-[120px] w-full">
                        <div className="flex justify-center gap-4 items-center md:text-[0.5rem]">
                          <button
                            onClick={() =>
                              updateQuantity(el._id, el.quantity + 1)
                            }
                          >
                            <FiPlusCircle />
                          </button>
                          <span>{el.quantity}</span>
                          <button
                            onClick={() =>
                              el.quantity > 1 &&
                              updateQuantity(el._id, el.quantity - 1)
                            }
                          >
                            <GrSubtractCircle />
                          </button>
                        </div>
                        <span className="md:text-sm">{product.price} $</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex justify-center mt-4 gap-2 text-purple-400">
                <span>Your cart is empty</span>
                <FaSmile className="text-xl" />
              </div>
            )}
          </div>

          <div className="bg-[#D6BD98] flex flex-col gap-3 w-full h-[400px] p-10 rounded-md shadow-md md:mb-3 md:mt-3 md:w-[80%]">
            <p className="font-light mb-4">Summary</p>
            <div className="flex justify-between font-light border-b-2 border-zinc-950">
              <span>Total Cart Price</span>
              <span>{cartItems.totalCartPrice || 0} $</span>
            </div>
            <div className="flex justify-between font-light border-b-2 border-zinc-950">
              <span>Tax Price</span>
              <span>0 $</span>
            </div>
            <div className="flex justify-between font-light border-b-4 border-zinc-950">
              <span>Shipping Price</span>
              <span>0 $</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total Order</span>
              <span>{cartItems.totalCartPrice || 0} $</span>
            </div>
            <button className="w-full bg-stone-800 hover:bg-stone-900 hover:text-blue-600 text-white mt-8 rounded-md">
              Checkout
            </button>
          </div>
        </section>
      ) : (
        <div className="h-screen flex justify-center mt-4 gap-2 text-purple-400">
          <span>Please log in first</span>
          <FaSmileWink className="text-xl" />
        </div>
      )}
    </>
  );
}
