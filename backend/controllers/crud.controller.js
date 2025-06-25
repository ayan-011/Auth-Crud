import mongoose from 'mongoose';
import {Crud} from '../models/crud.model.js';
import fs from 'fs';
import path from 'path';

//Create Post
export const createPost = async (req, res) => {
    try {
        const { name, title, message, email } = req.body;
        let photoUrl = '';
        if (req.file) {
            // Save the file to /uploads with a unique name
            const uploadsDir = path.join(path.resolve(), 'backend', 'uploads');
            if (!fs.existsSync(uploadsDir)) {
                fs.mkdirSync(uploadsDir, { recursive: true });
            }
            const ext = path.extname(req.file.originalname);
            const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            const filePath = path.join(uploadsDir, filename);
            fs.writeFileSync(filePath, req.file.buffer);
            photoUrl = `/uploads/${filename}`;
        }
        // Validation
        if (!name || !title || !message ) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        // Save to DB (replace 'Item' with your model name)
        const newItem = await Crud.create({ 
            name: name,
            title: title,
            message: message,
            email: email,
            userId: req.id,
            photo: photoUrl
         }); 
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: newItem
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Read Posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Crud.find({ userId: req.id }).sort({ createdAt: 1 });
    //Sorts the results in descending order by createdAt, So the newest post comes first, and the oldest post comes last.
    //.sort({ createdAt: -1 })  = Newest first (Descending)
    //.sort({ createdAt: 1 })   = Oldest first (Ascending)
    
    res.status(200).json({
      success: true,
      data: posts
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
 

export const getPostById = async (req, res) => {
  try {
    const post = await Crud.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ 
        success: false, 
        message: "Post not found" 
      });
    }

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


//Update Post 
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, title, message } = req.body;

        // 1. Validate ID format FIRST
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }

        // 2. Validate required fields
        if (!name || !title || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, title and message are required"
            });
        }

        // 3. Perform update
        const updatedPost = await Crud.findByIdAndUpdate(
            id,
            { name, title, message, email },
            { new: true, runValidators: true }
        );

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: "Post not found with this ID"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost
        });

    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during update",
            error: process.env.NODE_ENV === "development" ? error.message : undefined
        });
    }
};
 

//Delete Post 
export const deletePost = async (req, res)=>{
      const {id} = req.params;

       // 1. Validate ID format FIRST
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid post ID"
            });
        }
  
      try{
          await Crud.findByIdAndDelete(id)
          res.status(200).json({success: true, message: "post deleted"})
      }catch(error){
        console.log("error in deleteing product:", error)
        res.status(500).json({success:false, message: `server error`, error: error.message })
      }
}

 


 