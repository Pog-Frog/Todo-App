import {Router} from "express";
import {AuthController} from "../controllers/auth.controller";
import {CreateUserDto, LoginUserDto} from "../dtos/user.dto";
import {authMiddleware} from "../middlewares/auth.middleware";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {alreadyAuthorizedMiddleware} from "../middlewares/already_authorized.middleware";
import {Route} from "../interfaces/route.interface";


export class AuthRoute implements Route {
    public path = "/api";
    public router = Router();
    public authController = new AuthController();


    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, validationMiddleware(CreateUserDto), alreadyAuthorizedMiddleware, this.authController.signup);
        this.router.post(`${this.path}/login`, validationMiddleware(LoginUserDto), alreadyAuthorizedMiddleware, this.authController.login);
        this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logout);
    }
}