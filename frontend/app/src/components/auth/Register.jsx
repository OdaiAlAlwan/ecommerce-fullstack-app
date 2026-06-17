import { Link } from 'react-router-dom'
import shopImg from '../../assets/shopImage.png'

export default function Register() {
  return (
    <div className=' overflow-hidden  h-[100vh] grid  grid-cols-[50%_50%] gap-10 justify-center items-center md:flex '>
    <div className='h-[600px] w-[500px] flex justify-center items-center z-[-1] landing bg-[#f7f7f7] md:hidden '>
     <img src={shopImg} alt='' className=' z-[-1]  '/> 
   </div> 
   <div className='flex justify-center items-center m-4 p-4'>
     <div className='bg-[rgb(238,238,238)] md:text-sm w-[400px] h-[550px] md:w-[350px]  md:h-[450px] flex flex-col justify-center items-center gap-2 md:gap-[2px]  rounded-lg z-[1] shadow-xl' >
     <div className='flex flex-col gap-1 w-[250px]  ' >
         <label>Name</label>
         <input  id='name' type='name' placeholder='Full Name' className=' border-black rounded-md  outline-none p-2'  />
         </div>
         <div className='flex flex-col gap-1 w-[250px]' >
         <label>Email</label>
         <input  id='email' type='email' placeholder='email@example.com' className=' border-black rounded-md  outline-none p-2'  />
         </div>
         <div className='flex flex-col gap-1 w-[250px]'>
         <label>Password</label>
         <input  id='password' type='password' placeholder='Password . . .' className=' border-black rounded-md  outline-none p-2'  />
         </div>
         <div className='flex flex-col gap-1 w-[250px]'>
         <label>Confirm Password</label>
         <input  id='password' type='password' placeholder='Confirm Password . . .' className=' border-black rounded-md  outline-none p-2'  />
         </div>
         <button  disabled className='bg-sky-500 hover:bg-sky-700 w-[100px] disabled:cursor-not-allowed rounded-md p-2 text-white text-l mt-10 md:mt-4'>Sign Up</button>
         <div>
         <span>You Have Account 
           <Link to={'/SignIn'}>
           <button  className='p-2 text-sky-700  text-l mt-10 md:mt-4'>Sign In</button>
           </Link>
         </span>
         </div>
       

       </div>

   </div>
      

   </div>
  )
}
