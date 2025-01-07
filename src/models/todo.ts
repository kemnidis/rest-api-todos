import { pool } from "../db";

export const getTodos = async () => {
  const res = await pool.query("SELECT * FROM todos");
  return res.rows;
};

export const addTodo = async (
  title: string,
  description: string,
  userId: string,
  tag: string
) => {
  const res = await pool.query(
    "INSERT INTO todos (title, description, userid, tag) VALUES ($1, $2, $3, $4)",
    [title, description, userId, tag]
  );
  return res;
};

export const toggleTodoIsCompleted = async (id: string) => {
  const res = await pool.query(
    "UPDATE todos SET isCompleted = NOT isCompleted WHERE id = $1",
    [Number(id)]
  );

  return res;
};
