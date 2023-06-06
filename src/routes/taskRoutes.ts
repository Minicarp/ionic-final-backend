import { Router } from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/taskController";

const router = Router();

//GET all tasks
router.get('/', getAllTasks);
//POST creates new task
router.post('/', createTask);
//PUT updates existing task
router.put('/:id', updateTask);
//DELETE deletes existing task
router.delete('/:id', deleteTask);

export default router;