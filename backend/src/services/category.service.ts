import {Service} from 'typedi';
import {HttpException} from '../exceptions/http.exception';
import prisma from '../libs/prismadb';
import {Category} from '../interfaces/category.interface';
import {User} from "../interfaces/user.interface";


@Service()
export class CategoryService {
    public async createCategory(categoryData: Category): Promise<Category> {
        let findUser: User;
        try {
            findUser = await prisma.user.findFirst({where: {id: categoryData.userId}});
        } catch (error) {
            throw new HttpException(404, "User not found");
        }
    
        let createdCategory: Category;
        try {
            createdCategory = await prisma.category.create({
                data: {
                    name: categoryData.name,
                    userId: categoryData.userId,
                    icon: categoryData.icon,
                    color: categoryData.color,
                    isEditable: categoryData.isEditable
                }
            });
        } catch (error) {
            throw new HttpException(500, "Category not created");
        }
    
        try {
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
        } catch (error) {
            throw new HttpException(500, "Failed to update user");
        }
    
        return createdCategory;
    }
    

    public async updateCategory(categoryId: string, categoryData: Category, userId: string): Promise<Category> {
        let findCategory: Category;
        try {
            findCategory = await prisma.category.findFirst({where: {id: categoryId}});
        } catch (error) {
            throw new HttpException(404, "Category not found");
        }
    
        if (findCategory.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }
    
        let updatedCategory: Category;
        try {
            updatedCategory = await prisma.category.update({
                where: {id: categoryId},
                data: {
                    name: categoryData.name,
                    icon: categoryData.icon,
                    color: categoryData.color,
                    isEditable: categoryData.isEditable
                }
            });
        } catch (error) {
            throw new HttpException(500, "Category not updated");
        }
    
        return updatedCategory;
    }
    

    public async deleteCategory(categoryId: string, userId: string): Promise<string> {
        let findCategory: Category;
        try {
            findCategory = await prisma.category.findFirst({where: {id: categoryId}});
        } catch (error) {
            throw new HttpException(404, "Category not found");
        }
    
        if (findCategory.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }
    
        let deletedCategory: Category;
        try {
            deletedCategory = await prisma.category.delete({
                where: {id: categoryId}
            });
        } catch (error) {
            throw new HttpException(500, "Category not deleted");
        }
    
        return "Category deleted";
    }
    

    public async getCategories(userId: string): Promise<Category[]> {
        let findUser: User;
        try {
            findUser = await prisma.user.findFirst({where: {id: userId}});
        } catch (error) {
            throw new HttpException(404, "User not found");
        }
    
        let categories: Category[];
        try {
            categories = await prisma.category.findMany({where: {userId: userId}});
        } catch (error) {
            throw new HttpException(500, "Failed to retrieve categories");
        }
    
        return categories;
    }

    public async getCategory(categoryId: string, userId: string): Promise<Category> {
        let findCategory: Category;
        try {
            findCategory = await prisma.category.findFirst({
                where: {id: categoryId},
                include: {tasks: true}
            });
        } catch (error) {
            throw new HttpException(404, "Category not found");
        }
    
        if (findCategory.userId.toString() !== userId) {
            throw new HttpException(401, "Unauthorized");
        }
    
        return findCategory;
    }
}
