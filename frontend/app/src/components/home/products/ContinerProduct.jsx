
import CardProduct from './CardProduct'
import { useDispatch, useSelector } from 'react-redux';
import { Get_Product } from '../../../rtk/slices/Product-slice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import Lodaing from '../../../ui/Lodaing';

export default function ContinerProduct({  title }) {
    const { data , loader } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        try {
          await dispatch(Get_Product());
        } catch (error) {
          toast.error("Something went wrong, please try again!");
        }
      };
  
      fetchData();
    }, [dispatch]);

  if (loader) return <div className="container mt-4"><Lodaing /></div>;
  return (
    <>
    <div className='container w-full m-1 px-1 md-lg:mt-1 sm:w-[100%]'>
        <div className='w-[85%] md:w-[90%] lg:w-[90%] mx-auto mt-5 cursor-pointer' >
        <div className='flex justify-between items-center'>
            <h2 className='mt-3 mb-4 text-[#ddd] text-md font-extralight tracking-[10px]'>{title}</h2>
        </div>
       <div className='w-full'>
        <div className='grid grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 gap-6 sm:gap-4 w-full'>
        {data.slice(0, 5).map((ele) =>  {
            return (
                <CardProduct key={ele._id} data={ele} />
            )
        })}
        </div>
       </div>
    </div>
    </div>
    </>
  )
}
