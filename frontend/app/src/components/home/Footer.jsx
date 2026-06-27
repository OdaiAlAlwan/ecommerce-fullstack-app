import { MdOutlineCopyright } from "react-icons/md";
export default function Footer() {
    const date = new Date()
  return (
    <footer className='bg-[#121620] mt-10  h-[60px] md-lg:h-[50px]'>
        <div className='container mx-auto] sm:w-[100%]'>
            <div className='flex justify-center items-center py-3 text-white'>
                <MdOutlineCopyright className='mx-1 text-white'/> {date.getFullYear()} by ODAI
            </div>
        </div>

    </footer>
  )
}
