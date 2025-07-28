import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.', 
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ post, postId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    name: '',
    email: '',
    title: '',
    message: ''
  });

  React.useEffect(() => {
    if (open) {
      if (post) {
        setForm({
          name: post.name || '',
          email: post.email || '',
          title: post.title || '',
          message: post.message || ''
        });
      } else {
        setForm({ name: '', email: '', title: '', message: '' });
      }
    }
  }, [open, post]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/crud/${postId}`, form, { withCredentials: true });
      if (res.data.success) {
        toast.success('Post updated successfully');
        handleClose();
        setForm({ name: '', email: '', title: '', message: '' });
        navigate('/crud');
      } else {
        toast.error(res.data.message || 'Failed to update post');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update post');
    }
  };

  const handleCloseAndReset = () => {
    setForm({ name: '', email: '', title: '', message: '' });
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Edit</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseAndReset}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} className='bg-zinc-900  rounded-2xl'>
            <form name='Form' onSubmit={handleSubmit}>
              <div className="inputs   flex flex-col p-2 gap-y-4">

              <div className='flex flex-col gap-[1px]'>
               <span className='  pl-2 text-gray-400'>name:</span>
                <input 
                  name="name" 
                  placeholder='name' 
                  className='bg-zinc-300 text-zinc-800 p-2 rounded-lg outline-none' 
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className='flex flex-col gap-[1px]'>
               <span className='  pl-2 text-gray-400'>email:</span>
                <input 
                  name="email" 
                  placeholder='email' 
                  className='bg-zinc-300 text-zinc-800 p-2 rounded-lg outline-none' 
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col gap-[1px]'>
               <span className='  pl-2 text-gray-400'>title:</span>
                <input 
                  name="title"  
                  placeholder='title' 
                  className='bg-zinc-300 text-zinc-800 p-2 rounded-lg outline-none' 
                  value={form.title}
                  onChange={handleChange}
                />

              </div>

              <div className='flex flex-col gap-[2px]'>
               <span className='  pl-2 text-gray-400'>message:</span>
                <textarea 
                  name="message" 
                  placeholder='message...' 
                  className='bg-zinc-300 text-zinc-800 p-2 rounded-lg outline-none'
                  value={form.message}
                  onChange={handleChange}
                ></textarea>    
                  </div>           


              </div>
              <div className="  mt-3  flex px-6">
                <input 
                  type="submit" 
                  value="Update post" className='bg-blue-600 hover:bg-blue-700 w-full p-2 rounded-lg text-xl text-white cursor-pointer '  />
              </div>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
