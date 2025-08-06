import {Router} from "express";
import {signUp , login, forgetPass , resetPassword} from "../controllers/authController.js"


//express router 
let router = Router();

//routes
router.post("/signup", signUp);
router.post("/login", login);
router.post('/forgetPass' , forgetPass);
router.post('/resetpass' , resetPassword)

export default router;