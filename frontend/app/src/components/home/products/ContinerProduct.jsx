

import { Link } from 'react-router-dom'
import CardProduct from './CardProduct'
import Carousel from 'react-multi-carousel'
import { useDispatch, useSelector } from 'react-redux';
import { Get_Product } from '../../../rtk/slices/Product-slice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import Lodaing from '../../../ui/Lodaing';



export default function ContinerProduct({  title , btn  }) {

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



    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1350 },
            items: 4.5
        },
        mddesktop: {
            breakpoint: { max: 1350, min: 1024 },
            items: 4
        },
        xltablet: {
            breakpoint: { max: 1024, min: 764 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 764, min: 576 },
            items: 2.2
        },
        mobile: {
            breakpoint: { max: 576, min: 0 },
            items: 1.5
        },
        xsmobile: {
          breakpoint: { max: 376, min: 0 },
          items: 1
      },
      }


  if (loader) return <div className="container mt-4"><Lodaing /></div>;
  return (
    <>
    <div className='container w-full  m-1 px-1 md-lg:mt-1 sm:w-[100%]'>
        <div className='w-[85%] md:w-[90%] lg:w-[90%] mx-auto mt-5 cursor-pointer' >
        <div className='flex justify-between items-center'>
            <h2 className='mt-3  mb-4 text-[#ddd] text-md font-extralight tracking-[10px]'>{title}</h2>
            <Link to={'/Shop'}><button className ={`${btn ? 'border bg-sky-600 px-2 py-1 text-white  hover:bg-sky-800 rounded-md' : null }`} >{btn}</button></Link>
        </div>
      
       <div className='w-full flex flex-wrap  md-lg:gap-8'>
        <div  className='w-full'>
       <Carousel
        additionalTransfrom={0}
        arrows={true}
        responsive={responsive}
        
        >
        {data.map((ele , i) =>  {
            return (
                <CardProduct key={ele._id} data={ele} />
            )
        })}
    
        </Carousel>
        </div>
       </div>
    </div>
    </div>
    </>
  )
}
