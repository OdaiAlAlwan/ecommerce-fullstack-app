
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Add_ToCart, GETLogged_User_ProductCart } from "../../../rtk/slices/Cart-slice";
/**
 * CardProduct.jsx — Individual Product Card Component
 *
 * Displays a summary of a product within a listing (image, title, price).
 * Includes quick actions to:
 *  - Navigate to the detailed product page
 *  - Add the product directly to the shopping cart (with authentication check)
 *  - Display the current quantity of the product already in the cart as a badge
 */

export default function CardProduct({ data }) {
  const { isLogin } = useSelector((state) => state.auth);
  const { _id, imageCover, price, title } = data;
  const dispatch = useDispatch();

 
  const cart = useSelector((state) => state.cart.data);
  const productInCart = cart?.cartItems?.find(
    (item) => item.product._id === _id
  );



  // Handles adding the product to the user's cart
  const AddedProduct = async (e, id) => {
    if(isLogin){
      e.preventDefault();
      dispatch(Add_ToCart({ productId: id }))
        .unwrap()
        .then(() => {
          toast.success("Successfully added the product to your cart");
          dispatch(GETLogged_User_ProductCart());
        })
        .catch((error) => {
          toast.error("Something is wrong");
        });
    }else if (!isLogin){
      toast("Please log in first", { duration: 6000 });
    }
  };


  return (
    <div className="w-full h-[320px]">
      <div className="border group transition-all duration-500 hover:shadow-md hover:-mt-3 border-[#eee] shadow-md rounded-lg h-[290px] w-[190px]  cardProduct">
        <div className="relative overflow-hidden">
       <Link to={`/${_id}`}>
          <img
            src={imageCover}
            alt="Product"
            className="w-full p-5 border-b-2 border-[#eee] rounded-md h-[180px]"
          />
        </Link>
        </div>
        <p className="px-2 mt-3 text-sm font-light h-[45px] w-full overflow-clip">
          {title}
        </p>
        <div className="flex justify-center items-center m-2 flex-row gap-8  font-bold flex-nowrap">
          <div>{price} $</div>
          <div className="flex items-center font-extralight text-sm gap-1">
            <ul className="flex justify-center items-center gap-2">
              <Link to={`/${_id}`}>
                <li className="w-[24px] h-[24px] cursor-pointer bg-white border border-[#eee] flex justify-center items-center rounded-full hover:bg-[#eee] hover:rotate-[720deg] transition-all">
                  <FaEye />
                </li>
              </Link>
              <li className="relative w-[24px] h-[24px] cursor-pointer bg-white border border-[#eee] flex justify-center items-center rounded-full hover:bg-[#eee] hover:rotate-[720deg] transition-all">
                <RiShoppingCartLine onClick={(e) => AddedProduct(e, _id)} />
                {productInCart && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {productInCart.quantity}
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
