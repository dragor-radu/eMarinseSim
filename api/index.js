import express from 'express';
import mongoose from 'mongoose';
import porturiRoutes from './routes/porturi.routes.js';
import naveRoutes from './routes/nave.routes.js';
import programRoutes from './routes/program.routes.js';
import ruteRoutes from './routes/rute.routes.js';
import navigationRoutes from './routes/navigation.routes.js';
import { startProgramCheck } from './controllers/navigation.controller.js';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

mongoose.connect("mongodb+srv://cristianmihaila:wRS8LMmIVlJnpoW9@e-marine.perf2i9.mongodb.net/e-marine_db?retryWrites=true&w=majority&appName=e-marine").then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, '/client/dist')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use("/api/porturi", porturiRoutes);
app.use("/api/nave", naveRoutes);
app.use("/api/program", programRoutes);
app.use("/api/rute", ruteRoutes);
app.use("/api/navigation", navigationRoutes);

startProgramCheck();


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode
    });
});