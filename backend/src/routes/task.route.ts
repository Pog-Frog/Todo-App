import {Router} from "express";
import {authMiddleware} from "../middlewares/auth.middleware";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {Route} from "../interfaces/route.interface";
import {TaskController} from "../controllers/task.controller";
import {CreateTaskDto, UpdateTaskDto} from "../dtos/task.dto";


export class TaskRoute implements Route {
    public path = "/api/tasks";
    public router = Router();
    public taskController = new TaskController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateTaskDto), this.taskController.createTask);
        this.router.put(`${this.path}/:taskId`, authMiddleware, validationMiddleware(UpdateTaskDto), this.taskController.updateTask);
        this.router.delete(`${this.path}/:taskId`, authMiddleware, this.taskController.deleteTask);
        this.router.get(`${this.path}`, authMiddleware, this.taskController.getTasks);
        this.router.get(`${this.path}/:taskId`, authMiddleware, this.taskController.getTask);
        this.router.get(`${this.path}/user/:userId`, authMiddleware, this.taskController.getTasks);
    }
}
