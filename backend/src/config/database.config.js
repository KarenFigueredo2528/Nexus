import mysql from 'mysql2/promise';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export const mariaDB = mysql.createPool({
    host: process.env.MARIADB_HOST,
    port: process.env.MARIADB_PORT,
    user: process.env.MARIADB_USER,
    password: process.env.MARIADB_PASSWORD,
    database: process.env.MARIADB_DATABASE,
    connectionLimit: 10
});

export const mongoClient = new MongoClient(process.env.MONGODB_URI);

export async function connectMongoDB() {
    await mongoClient.connect();
    console.log("✅ Conectado a MongoDB");
    return mongoClient.db(process.env.MONGODB_DATABASE);
}
