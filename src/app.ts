import { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { db } from './models';
import taskRoutes from './routes/taskRoutes'

const express = require('express')
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:8100'],
}

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//routes
app.use('/api/tasks', taskRoutes) //Tasks Route - needs function from controller



app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).end();
});


//syncing the db
db.sync().then(() => {
    console.info('connected to the database')
});

app.listen(3000);