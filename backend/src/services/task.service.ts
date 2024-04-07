import {Service} from 'typedi';
import {HttpException} from '../exceptions/http.exception';
import prisma from '../libs/prismadb';
import {Category} from '../interfaces/category.interface';
import {User} from "../interfaces/user.interface";
import {Task} from "../interfaces/task.interface";


@Service()
export class TaskService {
    public async createTask(taskData: Task): Promise<Task> {
        const findUser: User = await prisma.user.findFirst({where: {id: taskData.userId}});
        if (!findUser) {
            throw new HttpException(404, "User not found");
        }

        if (taskData.categoryId) {
            const findCategory: Category = await prisma.category.findFirst({where: {id: taskData.categoryId}});
            if (!findCategory) {
                throw new HttpException(404, "Category not found");
            }
        }

        const createdTask: Task = await prisma.task.create({
            data: {
                title: taskData.title,
                description: taskData.description,
                isCompleted: taskData.isCompleted,
                categoryId: taskData.categoryId,
                userId: taskData.userId
            }
        });

        if (!createdTask) {
            throw new HttpException(500, "Task not created");
        }

        if (taskData.categoryId) {
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
        }

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

        return createdTask;
    }
        

    public async updateTask(taskData: Task, userId: string): Promise<Task> {
        const findTask: Task = await prisma.task.findFirst({where: {id: taskData.id}});
        if (!findTask) {
            throw new HttpException(404, "Task not found");
        }

        const findCategory: Category = await prisma.category.findFirst({where: {id: findTask.categoryId}});
        if (!findCategory) {
            throw new HttpException(404, "Category not found");
        }

        if (findCategory.userId.toString() !== userId || findTask.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }

        const updatedTask: Task = await prisma.task.update({
            where: {id: taskData.id},
            data: {
                title: taskData.title,
                description: taskData.description,
                isCompleted: taskData.isCompleted,
                categoryId: taskData.categoryId
            }
        });

        if (!updatedTask) {
            throw new HttpException(500, "Task not updated");
        }

        return updatedTask;
    }

    public async deleteTask(taskId: string, userId: string): Promise<string> {
        const findTask: Task = await prisma.task.findFirst({where: {id: taskId}});
        if (!findTask) {
            throw new HttpException(404, "Task not found");
        }

        if (findTask.categoryId) {
            const findCategory: Category = await prisma.category.findFirst({where: {id: findTask.categoryId}});
            if (!findCategory) {
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

        const deletedTask: Task = await prisma.task.delete({
            where: {id: taskId}
        });

        if (!deletedTask) {
            throw new HttpException(500, "Task not deleted");
        }

        return "Task deleted";
    }

    public async getTasks(userId: string): Promise<Task[]> {
        const findUser: User = await prisma.user.findFirst({where: {id: userId}});
        if (!findUser) {
            throw new HttpException(404, "User not found");
        }

        const tasks: Task[] = await prisma.task.findMany({where: {userId: userId}});


        return tasks;
    }

    public async getTask(taskId: string, userId: string): Promise<Task> {
        const findTask: Task = await prisma.task.findFirst({where: {id: taskId}, include: {category: true}});
        if (!findTask) {
            throw new HttpException(404, "Task not found");
        }

        if (findTask.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }

        return findTask;
    }

}