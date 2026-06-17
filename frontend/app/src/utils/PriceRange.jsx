import { useState } from "react"
import {Range} from "react-range"
import { useSelector } from "react-redux"
export default function PriceRange() {
  const { data } = useSelector((state) => state.products)
  const [state , setState] = useState({values : [100 , 2000]})

  return (
    <>
     <h2 className='mb-2 font-bold mt-4' >Price</h2>
     <Range
        step={6}
        min={100}
        max={2000}
        values={(state.values)}
        onChange={(values) => setState({values})}
        renderTrack={({props, children}) => (
            <div {...props} className="w-[160px] bg-slate-300 h-[6px] rounded-full" >
                {children}
            </div>
        )}
        renderThumb={({props}) => (
            <div className=" bg-[#153448] w-[15px] h-[15px] rounded-full cursor-pointer "  {...props} />

        )}
     />
     <span>$ {Math.floor(state.values[0])} -  $ {Math.floor(state.values[1])}</span>
    </>
   
  )
}
