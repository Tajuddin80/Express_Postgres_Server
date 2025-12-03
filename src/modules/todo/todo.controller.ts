import { Request, Response } from "express";
import { pool } from "../../config/db";

const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);
    res.status(200).json({
      success: true,
      message: "todos retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while all todos get",
    });
  }
};

const createTodo = async (req: Request, res: Response) => {
  const { user_id, title, description, due_date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos (  user_id ,
      title ,
      description ,
      due_date ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, title, description, due_date]
    );
    res.status(201).json({
      success: true,
      message: "Todo created",
      data: result.rows[0],
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ success: false, message: "Error while creating a todo" });
  }
};

const getSingleTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const result = await pool.query(`SELECT * FROM todos WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "todo retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while single todo get",
    });
  }
};
const updateTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { title, description, completed, due_date } = req.body;

    const result = await pool.query(
      `
      UPDATE todos SET
      title =$1,
      description =$2 ,
      completed = $3,
      due_date =$4,
      updated_at = NOW()
      WHERE id = $5
      RETURNING *;
      `,
      [title, description, completed, due_date, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating todo",
    });
  }
};

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      `DELETE FROM todos
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "todo not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "todo deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
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
