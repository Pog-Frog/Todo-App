import {Router} from "express";
import {CategoryController} from "../controllers/category.controller";
import {authMiddleware} from "../middlewares/auth.middleware";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {CreateCategoryDto, UpdateCategoryDto} from "../dtos/category.dto";
import {Route} from "../interfaces/route.interface";


export class CategoryRoute implements Route {
    public path = "/api/categories";
    public router = Router();
    public categoryController = new CategoryController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateCategoryDto), this.categoryController.createCategory);
        this.router.put(`${this.path}/:categoryId`, authMiddleware, validationMiddleware(UpdateCategoryDto), this.categoryController.updateCategory);
        this.router.delete(`${this.path}/:categoryId`, authMiddleware, this.categoryController.deleteCategory);
        this.router.get(`${this.path}`, authMiddleware, this.categoryController.getCategories);
        this.router.get(`${this.path}/:categoryId`, authMiddleware, this.categoryController.getCategory);
    }
}