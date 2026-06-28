/**
 * Cart.jsx — Shopping Cart Page Component
 *
 * Displays all cart items for the logged-in user fetched from the backend.
 * Allows the user to:
 *  - Update item quantities (+/-)
 *  - Remove individual items or clear the entire cart
 *  - View the order summary (subtotal, shipping, total)
 *  - Proceed to simulated checkout and navigate to the confirmation page
 *
 * Cart state is managed server-side via Redux (Cart-slice) and the backend API.
 */

import { useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { GrSubtractCircle } from "react-icons/gr";
import { IoMdCloseCircle } from "react-icons/io";
import { FaSmileWink } from "react-icons/fa";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  Delete_Cart,
  Delete_ItemAtCart,
  GETLogged_User_ProductCart,
  Update_CartItemQuantity,
} from "../../rtk/slices/Cart-slice";
import { Link, useNavigate } from "react-router-dom";
import { Simulate_Checkout } from "../../rtk/slices/Order-slice";
import { BsCart3 } from "react-icons/bs";
import toast from "react-hot-toast";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.auth);

  const cartItems = useSelector((state) => state.cart.data);

  useEffect(() => {
    if (isLogin) {
      dispatch(GETLogged_User_ProductCart());
    }
  }, [dispatch, isLogin]);

  // Clears all items from the user's cart by dispatching the Delete_Cart action
  const CleanCart = async () => {
    try {
      await dispatch(Delete_Cart()).unwrap();
      await dispatch(GETLogged_User_ProductCart());
      toast.success("Cart cleaned successfully");
    } catch (error) {
      toast.error("Failed to clean cart");
    }
  };

  // Removes a specific cart item by its ID, then refreshes the cart data
  const deleteItemById = async (id) => {
    try {
      await dispatch(Delete_ItemAtCart(id)).unwrap();
      await dispatch(GETLogged_User_ProductCart());
      toast.success("Product deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete item");
    }
  };

  // Updates the quantity of a specific cart item and refreshes cart data
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
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-3">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-row items-center sm:flex-col sm:items-start justify-between mb-4 gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm">
              <IoChevronBackCircleOutline className="text-xl" />
              <span className="font-medium">Continue Shopping</span>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        </div>

        {isLogin ? (
          <div className="flex flex-row lg:flex-col gap-6 lg:gap-4">
            {/* Cart Items Section */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sm:p-3 mb-4">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-100">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Cart Items ({cartItems?.cartItems?.length || 0})
                  </h2>
                  {cartItems?.cartItems?.length > 0 && (
                    <button
                      onClick={CleanCart}
                      className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors text-xs font-medium bg-red-50 px-2 py-1 rounded"
                    >
                      <BsCart3 /> Clear All
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-3 max-h-[450px] overflow-y-auto pr-1 custom-scrollbar">
                  {cartItems?.cartItems?.length > 0 ? (
                    cartItems.cartItems.map((el) => {
                      if (!el.product) return null;
                      const product = el.product;
                      return (
                        <div key={el._id} className="flex gap-3 p-3 rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all bg-white relative group">
                          {/* Image */}
                          <div className="w-20 h-20 sm:w-16 sm:h-16 flex-shrink-0 bg-gray-50 rounded-md p-1 flex items-center justify-center">
                            <img
                              src={product.imageCover}
                              alt={product.title}
                              className="max-w-full max-h-full object-contain mix-blend-multiply"
                            />
                          </div>

                          {/* Details */}
                          <div className="flex flex-1 flex-col justify-between">
                            <div className="flex justify-between items-start gap-2">
                              <h3 className="font-medium text-gray-800 line-clamp-2 text-sm sm:text-xs leading-tight">{product.title}</h3>
                              <button 
                                onClick={() => deleteItemById(el._id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                                title="Remove Item"
                              >
                                <IoMdCloseCircle className="text-2xl sm:text-xl" />
                              </button>
                            </div>

                            <div className="flex flex-row justify-between items-center mt-2 gap-2">
                              {/* Quantity Control */}
                              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-1 py-0.5">
                                <button
                                  onClick={() => el.quantity > 1 && updateQuantity(el._id, el.quantity - 1)}
                                  className={`w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-600 transition-colors ${el.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                  disabled={el.quantity <= 1}
                                >
                                  <GrSubtractCircle className="text-sm" />
                                </button>
                                <span className="font-bold w-4 text-center text-gray-800 text-xs">{el.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(el._id, el.quantity + 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-blue-600 transition-colors"
                                >
                                  <FiPlusCircle className="text-sm" />
                                </button>
                              </div>

                              <span className="font-bold text-base sm:text-sm text-blue-600">{product.price} $</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-gray-400">
                      <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                        <BsCart3 className="text-2xl opacity-40" />
                      </div>
                      <span className="text-base font-medium text-gray-600">Your cart is empty</span>
                      <p className="text-xs mt-1 max-w-xs text-center text-gray-400">Looks like you haven&apos;t added any products to your cart yet.</p>
                      <Link to="/" className="mt-4 px-6 py-2 text-sm bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow hover:shadow-md hover:-translate-y-0.5">
                        Start Shopping
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            {cartItems?.cartItems?.length > 0 && (
              <div className="w-[320px] lg:w-full flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 sticky top-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
                  
                  <div className="flex flex-col gap-3 text-sm text-gray-600 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium text-gray-800">{cartItems?.totalCartPrice || 0} $</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-green-500 font-medium text-xs bg-green-50 px-1.5 py-0.5 rounded">Free</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-gray-800">Total</span>
                      <span className="text-lg font-bold text-blue-600">{cartItems?.totalCartPrice || 0} $</span>
                    </div>
                  </div>

                  <button 
                    onClick={async () => {
                      try {
                        await dispatch(Simulate_Checkout(cartItems._id)).unwrap();
                        await dispatch(GETLogged_User_ProductCart());
                        toast.success("Order Placed Successfully!");
                        navigate('/order-confirmation');
                      } catch (error) {
                        toast.error(error || "Checkout failed");
                      }
                    }}
                    disabled={!cartItems?.cartItems?.length}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-lg transition-all shadow-sm hover:shadow flex justify-center items-center gap-2"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <div className="mt-4 flex items-center justify-center gap-2 opacity-50">
                     <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
                       <IoMdCloseCircle className="text-green-500 hidden" /> Secure Checkout
                     </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <FaSmileWink className="text-3xl text-blue-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">Hello there!</h2>
            <span className="text-sm text-gray-500 mb-6">Please log in to view and manage your cart</span>
            <Link to="/SignIn" className="px-8 py-2.5 text-sm bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-all shadow hover:shadow-md hover:-translate-y-0.5">
              Sign In to Continue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
