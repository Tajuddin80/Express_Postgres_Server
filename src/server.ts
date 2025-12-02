import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const app = express();
// app.use(cors());
app.use(express.json());

const port = 5000;

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
  res.send("Hello world and humans");
});

app.post("/", (req: Request, res: Response) => {
  console.log(req);
  res.status(201).json({ success: true, message: "User created" });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
function cors(): any {
  throw new Error("Function not implemented.");
}
