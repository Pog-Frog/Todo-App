import {Service} from 'typedi';
import {HttpException} from '../exceptions/http.exception';
import prisma from '../libs/prismadb';
import {Category} from '../interfaces/category.interface';
import {User} from "../interfaces/user.interface";


@Service()
export class CategoryService {
    public async createCategory(categoryData: Category): Promise<Category> {
        const findUser: User = await prisma.user.findFirst({where: {id: categoryData.userId}});
        if (!findUser) {
            throw new HttpException(404, "User not found");
        }

        const createdCategory: Category = await prisma.category.create({
            data: {
                name: categoryData.name,
                userId: categoryData.userId,
                icon: categoryData.icon,
                color: categoryData.color,
                isEditable: categoryData.isEditable
            }
        });

        if (!createdCategory) {
            throw new HttpException(500, "Category not created");
        }

        await prisma.user.update({
            where: {id: categoryData.userId},
            data: {
                categories: {
                    connect: {
                        id: createdCategory.id
                    }
                }
            }
        });

        return createdCategory;
    }    

    public async updateCategory(categoryId: string, categoryData: Category, userId: string): Promise<Category> {
        const findCategory: Category = await prisma.category.findFirst({where: {id: categoryId}});
        if (!findCategory) {
            throw new HttpException(404, "Category not found");
        }

        if (findCategory.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }

        const updatedCategory: Category = await prisma.category.update({
            where: {id: categoryId},
            data: {
                name: categoryData.name,
                icon: categoryData.icon,
                color: categoryData.color,
                isEditable: categoryData.isEditable
            }
        });

        if (!updatedCategory) {
            throw new HttpException(500, "Category not updated");
        }

        return updatedCategory;
    }

    public async deleteCategory(categoryId: string, userId: string): Promise<string> {
        const findCategory: Category = await prisma.category.findFirst({where: {id: categoryId}});
        if (!findCategory) {
            throw new HttpException(404, "Category not found");
        }

        if (findCategory.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }

        const deletedCategory: Category = await prisma.category.delete({
            where: {id: categoryId}
        });

        if (!deletedCategory) {
            throw new HttpException(500, "Category not deleted");
        }

        return "Category deleted";
    }

    public async getCategories(userId: string): Promise<Category[]> {
        const findUser: User = await prisma.user.findFirst({where: {id: userId}});
        if (!findUser) {
            throw new HttpException(404, "User not found");
        }

        const categories: Category[] = await prisma.category.findMany({where: {userId: userId}});

        return categories;
    }

    public async getCategory(categoryId: string, userId: string): Promise<Category> {
        const findCategory: Category = await prisma.category.findFirst({
            where: {id: categoryId},
            include: {tasks: true}
        });
        if (!findCategory) {
            throw new HttpException(404, "Category not found");
        }

        if (findCategory.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }

        return findCategory;
    }
}
