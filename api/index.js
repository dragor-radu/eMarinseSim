import express from 'express';
import mongoose from 'mongoose';
import porturiRoutes from './routes/porturi.routes.js';
import naveRoutes from './routes/nave.routes.js';
import programRoutes from './routes/program.routes.js';

mongoose.connect("mongodb+srv://cristianmihaila:wRS8LMmIVlJnpoW9@e-marine.perf2i9.mongodb.net/e-marine_db?retryWrites=true&w=majority&appName=e-marine").then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

const app = express();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.use("/api/porturi", porturiRoutes);
app.use("/api/nave", naveRoutes);
app.use("/api/program", programRoutes);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        error: message,
        statusCode
    });
});