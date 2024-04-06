import {IsString, IsNotEmpty, MinLength, IsEmail, MaxLength, IsOptional} from "class-validator";
import {Task, Category} from "@prisma/client";


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsString()
    @IsOptional()
    tasks: Task[];

    @IsString()
    @IsOptional()
    categories: Category[];
}

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}