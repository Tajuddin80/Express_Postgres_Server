import { Request, Response } from "express";
import { todosServices } from "./todo.service";

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await todosServices.getTodos();
    return res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while all todos get",
    });
  }
};

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, due_date } = req.body;
  try {
    const result = await todosServices.createTodo(
      user_id,
      title,
      description,
      due_date
    );
    return res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, message: "Error while creating a todo" });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const result = await todosServices.getSingleTodo(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "todo retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while single todo get",
    });
  }
};
const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, description, completed, due_date } = req.body;

    const result = await todosServices.updateTodo(
      title,
      description,
      completed,
      due_date,
      id as string
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "todo updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while updating todo",
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await todosServices.deleteTodo(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "todo deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while deleting todo",
    });
  }
};

export const todoControllers = {
  createTodo,
  getTodos,
  getSingleTodo,
  updateTodo,
  deleteTodo,
};
