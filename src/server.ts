import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STRING}` as string,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    age INT,
    phone VARCHAR(50),
    address TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
    )
    `);

  await pool.query(`
      CREATE TABLE IF NOT EXISTS todos(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) ON DELETE CASCADE,
      title VARCHAR(200) NOT NULL,
      description TEXT,
      completed BOOLEAN DEFAULT false,
      due_date DATE,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
      )`);
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

app.post("/create-user", async (req: Request, res: Response) => {
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
});

app.get("/users", async (req: Request, res: Response) => {
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
});

app.get("/users/:id", async (req: Request, res: Response) => {
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
});

app.put("/users/:id", async (req: Request, res: Response) => {
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
});

app.delete("/users/:id", async (req: Request, res: Response) => {
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
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
