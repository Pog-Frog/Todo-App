import {IsString, IsNotEmpty, IsOptional} from 'class-validator';


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    categoryId: string;

    @IsString()
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

    @IsString()
    @IsOptional()
    isCompleted: boolean;
}

