import {  Router } from "express";
import { userController } from "./user.controller";

const router = Router();

//! Users route

router.post("/create-user", userController.createuser);

router.get("/", userController.getUsers);

router.get("/:id", userController.getSingleUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);


export const userRoutes = router;