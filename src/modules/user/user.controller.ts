import { Request, Response } from "express";
import { userServices } from "./user.service";

const createuser = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const result = await userServices.createUser(payload);

    return res.status(201).json({
      success: true,
      message: "User created",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while user creation",
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    return res.status(200).json({
      success: true,
      message: "users retrieved successfully",
      data: result.rows,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while all users get",
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params?.id;
    const result = await userServices.getSingleUser(id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "user retrieved successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while single user get",
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const payload = req.body;

    const result = await userServices.updateUser(payload, id as string);

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Error while updating user",
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const result = await userServices.deleteUser(id as string);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    return res.status(500).json({
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
