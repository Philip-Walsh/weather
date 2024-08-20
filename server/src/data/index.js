

require("dotenv").config();
import { makeDb } from "./db";
const db = makeDb(String(process.env.DATABASE_URL), String(process.env.DATABASE_NAME));

module.exports = db;
