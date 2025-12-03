import { Request, Response } from "express";
import { pool } from "../../config/db";

const createuser = async (req: Request, res: Response) => {
  const { name, email, age, phone, address } = req.body;

  try {
    const result = await pool.query(
      `
      INSERT INTO users (name, email, age, phone, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
      [name, email, age, phone, address]
    );

    res.status(201).json({
      success: true,
      message: "User created",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while user creation",
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while all users get",
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while single user get",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, age, phone, address } = req.body;

    const result = await pool.query(
      `
      UPDATE users 
      SET name = $1, email =$2, age = $3, phone = $4, address = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *;
      `,
      [name, email, age, phone, address, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while updating user",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await pool.query(
      `DELETE FROM users
       WHERE id = $1`,
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting user",
    });
  }
};
export const userController = {
  createuser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
