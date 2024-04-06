import {NextFunction, Response, Request} from "express";
import {Container} from "typedi";
import {RequestWithUser} from "../interfaces/auth.interface";
import {TokenUtils} from "../utils/token.util";
import {HttpException} from "../exceptions/http.exception";
import {Category} from "../interfaces/category.interface";
import {CategoryService} from "../services/category.service";


export class CategoryController {
    public categoryService = Container.get(CategoryService);

    public createCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const categoryData: Category = req.body;

            if (!categoryData.userId) {
                const userId = await TokenUtils.getUserIDFromToken(req);

                if (!userId) {
                    throw new HttpException(409, "Invalid token");
                }

                categoryData.userId = userId;
            }

            const createdCategory: Category = await this.categoryService.createCategory(categoryData);
            res.status(201).json({data: createdCategory, message: "created"});

        } catch (error) {
            next(error);
        }
    }

    public updateCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const categoryData: Category = req.body;
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!userId) {
                throw new HttpException(409, "Invalid token");
            }

            const updatedCategory: Category = await this.categoryService.updateCategory(req.params.categoryId, categoryData, userId);
            res.status(200).json({data: updatedCategory, message: "updated"});

        } catch (error) {
            next(error);
        }
    }

    public deleteCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const categoryId = req.params.categoryId;
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!categoryId) {
                throw new HttpException(409, "Category ID is required");
            }

            const deletedCategory = await this.categoryService.deleteCategory(categoryId, userId);
            res.status(200).json({data: deletedCategory, message: "deleted"});

        } catch (error) {
            next(error);
        }
    }

    public getCategories = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!userId) {
                throw new HttpException(409, "Invalid token");
            }

            const categories = await this.categoryService.getCategories(userId);
            res.status(200).json({data: categories, message: "fetched"});

        } catch (error) {
            next(error);
        }
    }

    public getCategory = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!userId) {
                throw new HttpException(409, "Invalid token");
            }

            const category = await this.categoryService.getCategory(req.params.categoryId, userId);
            res.status(200).json({data: category, message: "fetched"});

        } catch (error) {
            next(error);
        }
    }
}