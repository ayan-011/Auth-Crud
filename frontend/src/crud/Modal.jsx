//modal.jsx
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

//import { useCrudStore } from '../store/crudStore';

import axios from 'axios';
import { toast } from 'sonner'
import { useState, useRef } from 'react';
import Toggle from '@/buttons/Toggle';
import Switch from '@/buttons/Togglemoon';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.',
  boxShadow: 24,

};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // At the top of the component
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    message: '',
    email: ""
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      setPhotoPreview(null);
    }
  };

  const handleAddPhotoClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('title', formData.title);
      data.append('message', formData.message);
      data.append('email', formData.email);
      if (photo) {
        data.append('file', photo);
      }
      const response = await axios.post('/api/crud/create', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });
      if (response.data.success) {
        toast.success('Post created successfully');
        handleClose();
        setFormData({
          name: '',
          title: '',
          message: '',
          email: ""
        });
        setPhoto(null);
        setPhotoPreview(null);
        window.location.reload();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post');
    }
  };



  return (



    <div>
      <Button onClick={handleOpen}>Post</Button>
      <Modal

        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='bg-gradient-to-r from-zinc-800 to-zinc-950   w-2/3 h-screen bg-red-90'>

       
 
             <form name='Form' action="" onSubmit={handleSubmit}  >
            <div className=" w-full  grid grid-col-2 h-screen md:flex bg-red-90  ">

              <div className="  bg-zinc-800 min-w-1/3 md:h-screen md:px-5 py-32 justify-center">
                <div className="profilephoto md:w-3/4 h-52 flex justify-center  bg-red-90">
                  <div className="photo bg-zinc-900 w-52 h-full text-white rounded flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Profile preview" className="object-cover w-full h-full" />
                    ) : (
                      'profile photo'
                    )}
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handlePhotoChange}
                />


                <div className="description md:w-3/4 w-full   mt-2   flex justify-center  bg-red-90">
                <div className="w-52 bg-blue-90 ">
                  <button className='border-[1px] border-zinc-600 cursor-pointer duration-300 text-sm text-gray-300 p-1 rounded hover:bg-zinc-100 hover:text-black transition-all' onClick={handleAddPhotoClick}>+Add photo</button>
                </div>
                </div>

              </div>

              <div className="2 flex flex-col bg-zinc-800   min-w-2/3  h-screen " >

                <div className="box1 md:w-8/9 w-full h-5/9 border-b-[1px] border-zinc-300 items-end flex  bg-red-90 ">


                  <div className="details w-full bg-green-90 flex flex-col gap-2  mb-8">
                    <div className="bg-blue-90 py-5 w-full text-3xl font-semibold text-center ">Create a new post</div>
                    <input
                      name="name"
                       value={formData.name}
                       onChange={handleChange}
                      placeholder='name'
                      className=' border-[1px] border-zinc-300 text-white p-2 rounded-lg outline-none' />
                    <input
                      name="email"
                       value={formData.email}
                       onChange={handleChange}
                      placeholder='email'
                      className=' border-[1px] border-zinc-300 text-white p-2 rounded-lg outline-none' />

                    <input
                      name="title"
                       value={formData.title}
                       onChange={handleChange}
                      placeholder='Title of your post'
                      className=' border-[1px] border-zinc-300 text-white p-2 rounded-lg outline-none  ' />

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder='Your custom message...'
                      className='border-[1px] border-zinc-300 text-zwhite p-2 rounded-lg outline-none'></textarea>




                  </div>


                </div>
                <div className="box2  md:w-8/9 w-full bg-red-90 py-6 flex justify-between">

                  <div className="dropdown ">
                    <div tabIndex={0} role="button" className=" cursor-pointer hover:text-white border-[1px] border-zinc-700 rounded p-2 text-sm">Collect extra information  ▽</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-44 p-2 gap-2 shadow-sm mt-2 ">
                      <li>
                      <div className='flex gap-4  '>
                        <Toggle />
                        <span>Name</span>
                      </div>
                      </li>
                      <li>
                      <div className='flex gap-4  '>
                        <Toggle />
                        <span>Email</span>
                      </div>
                      </li>
                      
                    </ul>
                  </div>
                  <div className=' flex flex-col items-center justify-center h-fit gap-1 bg-red-90 '>
                  <Switch/> 
                  <span className='text-sm text-zinc-200 select-none'>Theme of post</span> 
                  </div>

                  

                </div>
                
               <div className=" flex  md:w-8/9 py-9 ">
              <input 
                type="submit" 
                value="Create post" className='bg-blue-600 hover:bg-blue-700 w-full p-2 rounded-lg text-xl text-white cursor-pointer '  />
             </div>
              </div>
            </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
