import React from 'react'   
import Navbar from '../nav/Navbar' 
//import Modal from '../crud/modal'
 
import Button from '@/buttons/Button3'  


const Home = () => {
  return (
    <>
    <div className=' flex justify-center bg-black w-full h-screen'>    

       <div className="md:w-4/5 w-full h-screen bg-red-90  absolute">       
      <img src="/fish.jpg" alt="" className='hidden lg:block   w-full h-screen absolute object-cover ' />


    <div className=" md:w- w-full bg-red-90 h-screen relative ">
 
     <div className="w-full md:p-5 py-5 flex bg-red-90 justify-center items-center ">
      <Navbar/>
     </div>

     <div className="lg:max-w-2/3  bg-red-9 flex h-3/4  justify-center items-center bg-blue-90">
     <div className="bg-zinc-900/50 backdrop-blur-lg md:p-2 rounded-xl lg:w-[50vh] lg:h-[40vh] w-full h-[40vh]">
     
     <div className="bg-red-90 w-full h-2/3 text-center py-10">
     <h1 className='text-[40px] font-bold text-white bebas-neue-regular'>Build smarter. Launch faster</h1>
     </div>
     <div className="bg-red-90 w-full h-1/3 flex items-center justify-center">
    <a href="/signup">    
     <Button/>
    </a>
  
     </div>
     </div>
     </div>     
   
    </div>
    </div>
       
       </div>
       <div className="w-full h-96 bg-zinc-900"></div>

       </>

  )
}

export default Home