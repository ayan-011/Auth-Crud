import express from "express";
import {
	login,
	logout,
	signup, 
	checkAuth,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);  //http://localhost:5000/api/auth/signup
router.post("/login", login);
router.post("/logout", logout);

 


export default router;