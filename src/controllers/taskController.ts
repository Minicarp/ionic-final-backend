import { RequestHandler } from "express";
import { Task } from "../models/tasks";

export const getAllTasks: RequestHandler = async ( req, res, next ) => {
    let tasks = await Task.findAll();
    res.status(200).json(tasks)
}

export const createTask: RequestHandler = async ( req, res, next) => {
    let newTask: Task = req.body;

    if(newTask.title){
        let created = await Task.create(newTask);
        res.status(201).json(created);
    } else {
        res.status(400).json();
    }
}

export const updateTask: RequestHandler = async ( req, res, next ) => {
    let taskId = req.params.id;
    let updated: Task = req.body;

    let taskFound = await Task.findByPk(taskId);

    if(taskFound && taskFound.taskId == updated.taskId && updated.title ) {
        
        await Task.update(updated, {
            where: {taskId: taskId}
        });
        
        res.status(200).json();
    } else {
        res.status(400).json();
    }
}

export const deleteTask: RequestHandler = async ( req, res, next ) => {
    let taskId = req.params.id;
    let taskFound = await Task.findByPk(taskId);

    if(taskFound){
        await Task.destroy({
            where: {taskId: taskId}
        })
        res.status(200).json();
    }else{
        res.status(404).json();
    }
}