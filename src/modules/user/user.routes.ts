import { Router } from "express";
import { userController } from "./user.controller";
import { auth } from "../../middleware/auth";

const router = Router();

//! Users route

router.post("/create-user", userController.createuser);

router.get("/", auth("admin"), userController.getUsers);

router.get("/:id", auth("admin", "user"), userController.getSingleUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
