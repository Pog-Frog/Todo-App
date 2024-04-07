import {NextFunction, Response, Request} from "express";
import {Container} from "typedi";
import {RequestWithUser} from "../interfaces/auth.interface";
import {TaskService} from "../services/task.service";
import {TokenUtils} from "../utils/token.util";
import {HttpException} from "../exceptions/http.exception";
import {Task} from "../interfaces/task.interface";


export class TaskController {
    public taskService = Container.get(TaskService);

    public createTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const taskData: Task = req.body;

            if (!taskData.userId) {
                const userId = await TokenUtils.getUserIDFromToken(req);

                if (!userId) {
                    throw new HttpException(409, "Invalid token");
                }

                taskData.userId = userId;
            }

            const createdTask: Task = await this.taskService.createTask(taskData);
            res.status(201).json({data: createdTask, message: "created"});

        } catch (error) {
            next(error);
        }
    }

    public updateTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const taskData: Task = req.body;
            const taskId = req.params.taskId;
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!userId) {
                throw new HttpException(409, "Invalid token");
            }

            const updatedTask: Task = await this.taskService.updateTask(taskId, taskData, userId);
            res.status(200).json({data: updatedTask, message: "updated"});

        } catch (error) {
            next(error);
        }
    }

    public deleteTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const taskId = req.params.taskId;
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!taskId) {
                throw new HttpException(409, "Task ID is required");
            }

            if (!userId) {
                throw new HttpException(409, "Invalid token");
            }

            const deletedTask = await this.taskService.deleteTask(taskId, userId);
            res.status(200).json({data: deletedTask, message: "deleted"});

        } catch (error) {
            next(error);
        }
    }

    public getTasks = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!userId) {
                throw new HttpException(409, "Invalid token");
            }

            const tasks = await this.taskService.getTasks(userId);
            res.status(200).json({data: tasks, message: "found"});

        } catch (error) {
            next(error);
        }
    }

    public getTask = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const taskId = req.params.taskId;
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!taskId) {
                throw new HttpException(409, "Task ID is required");
            }

            if (!userId) {
                throw new HttpException(409, "Invalid token");
            }

            const task = await this.taskService.getTask(taskId, userId);
            res.status(200).json({data: task, message: "found"});

        } catch (error) {
            next(error);
        }
    }
}
