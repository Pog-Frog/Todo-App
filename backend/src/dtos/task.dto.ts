import {IsString, IsNotEmpty, IsOptional, IsBoolean} from 'class-validator';


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    userId: string;

    @IsString()
    @IsOptional()
    categoryId: string;

    @IsBoolean()
    @IsOptional()
    isCompleted: boolean;
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    categoryId: string;

    @IsBoolean()
    @IsOptional()
    isCompleted: boolean;
}

