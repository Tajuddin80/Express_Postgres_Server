import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password, role, age, phone, address } = payload;

  const hashedPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    ` INSERT INTO users (name, email, password, role, age, phone, address)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          RETURNING *;  `,
    [name, email, hashedPass, role, age, phone, address]
  );
  return result;
};

const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

const updateUser = async (payload: Record<string, unknown>, id: string) => {
  const { name, email, role, age, phone, address } = payload;
  const result = await pool.query(
    `
      UPDATE users 
      SET name = $1, email =$2,  age = $3, phone = $4, address = $5, updated_at = NOW(), role = $6
      WHERE id = $6
      RETURNING *;
      `,
    [name, email, age, phone, address, role, id]
  );
  return result;
};
const deleteUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users
       WHERE id = $1`,
    [id]
  );
  return result;
};

export const userServices = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
