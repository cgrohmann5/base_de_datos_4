import "dotenv/config";
import app from "./src/app.js";
import express from 'express';
import cors from 'cors';


app.use(cors({
  origin: process.env.FRONTEND_URL
}))

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
});