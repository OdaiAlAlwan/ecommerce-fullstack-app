import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GET_Categroy } from '../rtk/slices/Categroy-slice';
import { Get_AllProduct_WithSearch } from '../rtk/slices/Product-slice';

export default function Filter() {

    const { data } = useSelector((state) => state.categroy);
    const [category, setCategory] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(GET_Categroy());
    }, [dispatch]);

    const queryCategory = (e, value) => {
      if (e.target.checked) {
          setCategory(value)
      } else {
          setCategory('')
      }
  }


    useEffect(() => { 
      dispatch(
        Get_AllProduct_WithSearch({
              category,
          })
      )
  },[category, dispatch])
  

  return (
    <>
    <div className='flex  gap-1 flex-col'>
    <h2 className='mb-2 font-bold mt-4' >Categroy</h2>
        {data.map((ele , i) => {
            return (
                <div key={i} className='flex gap-1 font-light'>
                <input checked={category === ele.name ? true : false} onChange={(e)=>queryCategory(e,ele.name)} type="checkbox" id={ele.name} />
                <label >{ele.name}</label>
                </div>
            )

        })}
    </div>
   </>
  )
}
