import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditModal from '../crud/Editmodal.jsx'
import axios from 'axios';
import { toast } from 'sonner';

const EditUpdate = () => {

  const { id } = useParams(); // Get the post ID from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/crud/${id}`, {
          withCredentials: true
        });
        
        if (response.data.success) {
          setPost(response.data.data);
        } else {
          toast.error('Post not found');
          navigate('/crud');
        }
      } catch (error) {
        toast.error('Failed to load post');
        navigate('/crud');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, navigate]);

  if (loading) {
    return <div className="text-white bg-black text-center w-full h-screen flex items-center justify-center">Connection failed...</div>;
  }

  if (!post) {
    return <div className="text-white bg-black text-center w-full h-screen flex items-center justify-center">Post not found</div>;
  }
 
 
 
     
  return (
    <div className='w-full md:h-screen bg-zinc-950 flex justify-center select-none'>
    
        <div className="md:w-2/3 w-full grid grid-col-2  md:h-screen md:flex bg-zinc-100 ">

          <div className="1 bg-zinc-800 min-w-1/3 md:h-screen md:px-5 py-32 justify-center">
            <div className="profilephoto md:w-3/4 h-52 flex justify-center  ">
              <div className="photo bg-zinc-900 w-52 h-full text-white flex items-center justify-center overflow-hidden rounded">
                {post.photo ? (
                  <img src={post.photo.startsWith('/uploads/') ? `http://localhost:5000${post.photo}` : post.photo} alt="profile" className="object-cover w-full h-full" />
                ) : (
                  'profile photo'
                )}
              </div>
            </div>
 
            <div className="description md:w-3/4 w-full   mt-2   flex justify-center  bg-red-90">
                <div className="w-52 bg-blue-90 ">
                  <input type="submit" value="Change photo" className='border-[1px] border-zinc-600 cursor-pointer duration-300 text-sm text-gray-300 p-1 rounded hover:bg-zinc-100 hover:text-black transition-all' />
                </div>
                </div>


         
          </div>

          <div className="2 flex flex-col bg-zinc-800   min-w-2/3  h-screen " > 

            <div className="box1   md:w-8/9 w-full h-5/9   text-white p-5 py-8  bg-red-90">

            <div className="bg-blue-90 w-full text-zinc-200 text-center text-4xl  bg-red-90 underline">{post.title}</div> 
           
            <di className="details  w-full  ">
                <div className='flex items-center  gap-12 mt-14 py-3 bg-red-90'>
                <h1 className='text-2xl text-white'> {post.name} </h1>
                <h1 className="location text-zinc-400  flex ">location</h1>
                </div>
               

                <div className="bg-red-90 w-full mt-3">
                  <span className='text-sm text-zinc-400'>Message:</span>
                  <p className='text-sm p-1   h-20 rounded border-[1px] border-zinc-400 mt-1 '>{post.message}</p>
                </div>

                <div className="message w-full flex bg-red-90 justify-between py-4  bg-red-90  " >
                  <div className='flex    '>
                  
                  </div>
                  <span className=' '>
                    <EditModal post={post} postId={id} />
                  </span>
                </div>
 
            </di>
               
            
            </div>
            <div className="box2  md:w-8/9 w-full h-1/2 bg-red-90 px-5 ">

            <div className="details flex flex-col py-5 gap-2  border-t-[1px] border-zinc-400">
              <span className='text-zinc-400 text-sm underline'>Extra information:-</span>
              <div className='flex flex-col gap-3 text-white border-b-[1px] border-zinc-400 py-6 '>
             <span className='text-zinc-400'>name: <span className='text-white'></span></span> 
             <span className='text-zinc-400'>email: <span className='text-white'>{post.email}</span></span> 
              </div>
              <div className="message   w-full py-3  flex bg-red-90 " >
                  <div className='flex flex-row gap-5'>
                  <span className='bg-zinc-900/50 hover:bg-zinc-900/40  select-none cursor-pointer  p-2 rounded  md:text-[14px] flex items-center text-sm '>Send message</span>
                  <span className='bg-zinc-900/50 hover:bg-zinc-900/40  select-none cursor-pointer  p-2 rounded  md:text-[14px] flex items-center text-sm'>Contact</span>
                  <span className='bg-zinc-900/50 hover:bg-zinc-900/40  select-none cursor-pointer  p-2 rounded md:text-[14px] flex items-center text-sm'>Report user</span>
                  </div>                   
                </div>

            </div>
            </div>
          </div>
        </div>
   
    </div>
  )
}

export default EditUpdate