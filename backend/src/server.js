import dotenv from 'dotenv';
import app from './app.js';
import { connectMongoDB, mariaDB } from './config/database.config.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await mariaDB.getConnection();
        console.log("✅ Conectado a MariaDB");

        await connectMongoDB();
        console.log("✅ Conectado a MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
        process.exit(1);
    }
}

startServer();