import { pool } from "../db";

export const getUsers = async () => {
  const res = await pool.query("SELECT * FROM users");

  return res.rows;
};

export const addUser = async (email: string, password: string) => {
  const res = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [email, password]
  );

  return res;
};
