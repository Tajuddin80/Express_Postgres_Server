import { Router } from "express";
import { todoControllers } from "./todo.controller";

export const router = Router();

//! Todos route

router.get("/", todoControllers.getTodos);

router.post("/create-todo", todoControllers.createTodo);

router.get("/:id", todoControllers.getSingleTodo);

router.put("/:id",todoControllers.updateTodo);

router.delete("/:id", todoControllers.deleteTodo);


export const todoRoutes = router;