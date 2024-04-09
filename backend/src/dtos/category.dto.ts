import {Task} from "@prisma/client";
import {IsString, IsNotEmpty, IsOptional, IsBoolean} from 'class-validator';


export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    icon: string;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsOptional()
    userId: string;

    @IsBoolean()
    @IsOptional()
    isEditable: boolean;

    @IsString()
    @IsOptional()
    tasks: Task[];
}

export class UpdateCategoryDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    icon: string;

    @IsString()
    @IsOptional()
    color: string;

    @IsBoolean()
    @IsOptional()
    isEditable: boolean;

    @IsString()
    @IsOptional()
    tasks: Task[];
}
