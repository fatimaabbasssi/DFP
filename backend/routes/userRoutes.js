import {Router} from "express";
import { middlewareToProtect } from "../middlewares/authMiddleware.js";
import { deleteUser, getAllUsers, updateUser } from "../controllers/userController.js";

//  authorize("admin")
const router = Router();

router.get("/all", middlewareToProtect,  getAllUsers);

router.put("/:id", middlewareToProtect, updateUser);

router.delete("/:id", middlewareToProtect, deleteUser);

export default router;