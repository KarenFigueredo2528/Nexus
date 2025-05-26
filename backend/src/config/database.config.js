import mysql from "mysql2/promise";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const mariaDB = mysql.createPool({
  host: process.env.MARIADB_HOST,
  port: process.env.MARIADB_PORT,
  user: process.env.MARIADB_USER,
  password: process.env.MARIADB_PASSWORD,
  database: process.env.MARIADB_DATABASE,
  connectionLimit: 10,
});

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DATABASE;

export const mongoClient = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
});

export async function connectMongoDB() {
  try {
    console.log(`🔄 Intentando conectar a MongoDB en ${uri}`);
    await mongoClient.connect();
    console.log("✅ Conectado a MongoDB");
    const db = mongoClient.db(databaseName);
    console.log(`✅ Base de datos seleccionada: ${db.databaseName}`);
    return db;
  } catch (error) {
    console.error("❌ Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
}
