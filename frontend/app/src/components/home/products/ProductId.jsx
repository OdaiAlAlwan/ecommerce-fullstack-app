import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Lodaing from "../../../ui/Lodaing";
import { Get_Product_By_Id } from "../../../rtk/slices/Product-slice";
import { Add_ToCart, GETLogged_User_ProductCart } from "../../../rtk/slices/Cart-slice";

/**
 * ProductId.jsx — Product Details Page Component
 *
 * Fetches and displays detailed information for a specific product based on the URL parameter (ID).
 * Features include:
 *  - Clickable thumbnail images displayed in a row to browse product photos
 *  - Fetching the product data from the backend
 *  - Adding the product to the user's cart (with authentication check)
 *  - Displaying the current cart quantity for the selected product as a badge
 */

export default function ProductId() {
  const { id } = useParams();
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, loader } = useSelector((state) => state.products);
 
  const cart = useSelector((state) => state.cart.data);

  const [image, setImage] = useState("");



  // Fetch the specific product's data based on the ID from the URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(Get_Product_By_Id(id));
   
      } catch {
        toast.error("Something went wrong. Please try again!");
      }
    };
    fetchData();
  
    dispatch(GETLogged_User_ProductCart());
  }, [dispatch, id]);

  useEffect(() => {
    if (data.length > 0) {
      setImage(data[0].imageCover);
    }
  }, [data]);



  // Handles adding the product to the cart, ensuring the user is logged in
  const addProduct = async (e, prodId) => {
    if(isLogin){
    e.preventDefault();
    dispatch(Add_ToCart({ productId: prodId }))
      .unwrap()
      .then(() => {
        toast.success("Product added successfully to your cart");
       
        dispatch(GETLogged_User_ProductCart());
      })
      .catch((error) => {
        toast.error("Something is wrong");
      });
    }else if (!isLogin){
      toast("Please log in first", { duration: 6000 });
    }
  };













  if (loader) return <div className="container mt-4 "><Lodaing /></div>;

  return (
    <section className="container">
      {data.map((el) => {
        const productInCart = cart?.cartItems?.find(
          (item) => item.product._id === el._id
        );



        return (
          <div
            className="grid grid-cols-[450px_450px] md:grid-cols-1 gap-9 md:gap-0 justify-center"
            key={el._id}
          >
           
            <div className="p-5">
              <div className="border w-fit">
                <img
                  src={image || el.imageCover}
                  alt={el.title}
                  className="h-[400px] md:h-[250px] p-2"
                />
              </div>
              {/* Thumbnail images row — click to select, includes the cover image */}
              <div className="flex gap-2 mt-3 flex-wrap">
                {/* Cover image thumbnail */}
                <div
                  onClick={() => setImage(el.imageCover)}
                  className={`cursor-pointer border-2 rounded p-1 ${
                    image === el.imageCover || !image ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <img src={el.imageCover} alt="cover" className="w-[70px] h-[70px] object-contain" />
                </div>

                {/* Additional product images */}
                {el.images && el.images.map((ele, i) => (
                  <div
                    key={i}
                    onClick={() => setImage(ele)}
                    className={`cursor-pointer border-2 rounded p-1 ${
                      image === ele ? "border-blue-500" : "border-gray-200"
                    }`}
                  >
                    <img src={ele} alt={`product-${i}`} className="w-[70px] h-[70px] object-contain" />
                  </div>
                ))}
              </div>
            </div>
          
            <div className="p-5">
              <h2 className="font-bold">{el.title}</h2>
              <p className="leading-8 font-light">{el.description}</p>
              <div>
                <h6 className="font-medium text-blue-500 my-4">{el.price} $</h6>
                <div className="flex items-center gap-3 relative">
                 
                  <div className="relative">
                    <button
                      onClick={(e) => addProduct(e, el._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 flex justify-center items-center gap-2"
                    >
                      <span>Add To Cart</span>
                      <FaCartArrowDown />
                    </button>
                
                    {productInCart && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {productInCart.quantity}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

    </section>
  );
}
