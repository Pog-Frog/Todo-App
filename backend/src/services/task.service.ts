import {Service} from 'typedi';
import {HttpException} from '../exceptions/http.exception';
import prisma from '../libs/prismadb';
import {Category} from '../interfaces/category.interface';
import {User} from "../interfaces/user.interface";
import {Task} from "../interfaces/task.interface";


@Service()
export class TaskService {
    public async createTask(taskData: Task): Promise<Task> {
        let findUser: User;
        try {
            findUser = await prisma.user.findFirst({where: {id: taskData.userId}});
        } catch (error) {
            throw new HttpException(404, "User not found");
        }
    
        let findCategory: Category;
        if (taskData.categoryId) {
            try {
                findCategory = await prisma.category.findFirst({where: {id: taskData.categoryId}});
            } catch (error) {
                throw new HttpException(404, "Category not found");
            }
        }
    
        let createdTask: Task;
        try {
            createdTask = await prisma.task.create({
                data: {
                    title: taskData.title,
                    description: taskData.description,
                    isCompleted: taskData.isCompleted,
                    categoryId: taskData.categoryId,
                    userId: taskData.userId
                }
            });
        } catch (error) {
            throw new HttpException(500, "Task not created");
        }
    
        if (taskData.categoryId) {
            try {
                await prisma.category.update({
                    where: {id: taskData.categoryId},
                    data: {
                        tasks: {
                            connect: {
                                id: createdTask.id
                            }
                        }
                    }
                });
            } catch (error) {
                throw new HttpException(500, "Failed to update category");
            }
        }
    
        try {
            await prisma.user.update({
                where: {id: taskData.userId},
                data: {
                    tasks: {
                        connect: {
                            id: createdTask.id
                        }
                    }
                }
            });
        } catch (error) {
            throw new HttpException(500, "Failed to update user");
        }
    
        return createdTask;
    }       

    public async updateTask(taskId: string, taskData: Task, userId: string): Promise<Task> {
        let findTask: Task;
        try {
            findTask = await prisma.task.findFirst({where: {id: taskId}});
        } catch (error) {
            throw new HttpException(404, "Task not found");
        }
    
        if (taskData.categoryId) {
            let findCategory: Category;
            try {
                findCategory = await prisma.category.findFirst({where: {id: findTask.categoryId}});
            } catch (error) {
                throw new HttpException(404, "Category not found");
            }
    
            if (findCategory.userId.toString() !== userId || findTask.userId.toString() !== userId) {
                throw new HttpException(401, "Unauthorized");
            }
        } else {
            if (findTask.userId.toString() !== userId) {
                throw new HttpException(401, "Unauthorized");
            }
        }
    
        let updatedTask: Task;
        try {
            updatedTask = await prisma.task.update({
                where: {id: findTask.id},
                data: {
                    title: taskData.title,
                    description: taskData.description,
                    isCompleted: taskData.isCompleted,
                    categoryId: taskData.categoryId
                }
            });
        } catch (error) {
            throw new HttpException(500, "Task not updated");
        }
    
        return updatedTask;
    }
    

    public async deleteTask(taskId: string, userId: string): Promise<string> {
        let findTask: Task;
        try {
            findTask = await prisma.task.findFirst({where: {id: taskId}});
        } catch (error) {
            throw new HttpException(404, "Task not found");
        }
    
        if (findTask.categoryId) {
            let findCategory: Category;
            try {
                findCategory = await prisma.category.findFirst({where: {id: findTask.categoryId}});
            } catch (error) {
                throw new HttpException(404, "Category not found");
            }
    
            if (findCategory.userId.toString() !== userId || findTask.userId.toString() !== userId) {
                throw new HttpException(401, "Unauthorized");
            }
        } else {
            if (findTask.userId.toString() !== userId) {
                throw new HttpException(401, "Unauthorized");
            }
        }
    
        let deletedTask: Task;
        try {
            deletedTask = await prisma.task.delete({
                where: {id: taskId}
            });
        } catch (error) {
            throw new HttpException(500, "Task not deleted");
        }
    
        if (!deletedTask) {
            throw new HttpException(500, "Task not deleted");
        }
    
        return "Task deleted";
    }    

    public async getTasks(userId: string): Promise<Task[]> {
        let findUser: User;
        try {
            findUser = await prisma.user.findFirst({where: {id: userId}});
        } catch (error) {
            throw new HttpException(404, "User not found");
        }
    
        let tasks: Task[];
        try {
            tasks = await prisma.task.findMany({where: {userId: userId}});
        } catch (error) {
            throw new HttpException(500, "Failed to retrieve tasks");
        }
    
        return tasks;
    }
    

    public async getTask(taskId: string, userId: string): Promise<Task> {
        let findTask: Task;
        try {
            findTask = await prisma.task.findFirst({where: {id: taskId}, include: {category: true}});
        } catch (error) {
            throw new HttpException(404, "Task not found");
        }
    
        if (findTask.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }
    
        return findTask;
    }
    

}