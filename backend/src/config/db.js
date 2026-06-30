import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

// Reutiliza la conexión si ya existe.
// Esto evita crear múltiples conexiones innecesarias.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

export const connectDB = async () => {
  try {
    if (cached.conn) {
      return cached.conn;
    }

    const uri = process.env.MONGODB_URI;
    const dbName = process.env.DB_NAME || "farmacia_online";

    if (!uri) {
      throw new Error("Falta configurar la variable MONGODB_URI");
    }

    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
      throw new Error("La URI de MongoDB debe comenzar con mongodb:// o mongodb+srv://");
    }

    cached.promise =
      cached.promise ||
      mongoose.connect(uri, {
        dbName: dbName
      });

    cached.conn = await cached.promise;

    console.log("Conexión exitosa con MongoDB Atlas");
    console.log("Base de datos conectada:", cached.conn.connection.name);

    return cached.conn;
  } catch (error) {
    console.error("Error al conectar con MongoDB Atlas:", error.message);
    throw error;
  }
};