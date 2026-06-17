import React from 'react'

export default function Banner() {
  return (
    <div className='container w-full m-1 md-lg:mt-1 mb-4'>
        <div className='w-[85%] lg:w-[90%] mx-auto sm:w-[100%] cursor-pointer'>
            <div className='relative w-full h-[350px] md:h-[450px] bg-[#121620] rounded-xl overflow-hidden flex flex-col justify-center'>
                <div className='absolute right-0 top-0 bottom-0 w-2/3 bg-gradient-to-l from-[#1e3a4a] to-transparent opacity-50 z-0'></div>
                
                <div className='relative z-10 px-6 md:px-12 w-full md:w-[65%]'>
                    <span className='inline-block bg-[#5ce1ff] text-gray-900 text-[10px] md:text-xs font-bold tracking-wide px-3 py-1.5 rounded-full mb-4'>
                        NEW TECHNOLOGY 2026
                    </span>
                    
                    <h2 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] md:leading-[1.1] mb-4'>
                        Unleash the <br /> Future of <br /> Performance.
                    </h2>
                    
                    <p className='text-gray-400 text-xs md:text-sm mb-6 max-w-sm md:max-w-md'>
                        Discover the next generation of high-performance laptops designed for creators, gamers, and professionals.
                    </p>
                    
                    <div className='flex gap-3'>
                        <button className='bg-[#a9f0ff] hover:bg-[#8ee5f8] text-gray-900 text-sm md:text-base font-semibold px-5 py-2.5 rounded-md transition-colors'>
                            Shop Now
                        </button>
                        <button className='bg-[#374151] hover:bg-[#4b5563] text-white border border-gray-600 text-sm md:text-base font-semibold px-5 py-2.5 rounded-md transition-colors'>
                            Watch Teaser
                        </button>
                    </div>
                </div>

                <div className='hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[50%] h-[90%] bg-contain bg-right bg-no-repeat z-0 opacity-70' style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80")' }}>
                </div>
            </div>
        </div>
    </div>
  )
}
