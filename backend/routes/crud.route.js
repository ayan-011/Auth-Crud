import express from "express"; 
import { createPost, getPosts,getPostById, updatePost, deletePost } from "../controllers/crud.controller.js";
import { singleUpload } from "../middleware/multer.js";
//import { updatePost } from "../controllers/crud.controller.js";

const router = express.Router();
  
router.post('/create', singleUpload, createPost);

router.get('/', getPosts); 
router.get('/:id', getPostById);
router.put('/:id', updatePost); 
router.delete('/:id', deletePost); 

export default router;