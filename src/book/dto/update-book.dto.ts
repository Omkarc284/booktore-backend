import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/book.schemas"
import { IsString, IsNumber, IsEnum, IsOptional, IsEmpty } from "class-validator";


export class UpdateBookDto {

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly author: string;

    @IsOptional()
    @IsNumber()
    readonly price: number;

    @IsOptional()
    @IsEnum(Category, {message: 'Please enter correct category.'})
    readonly category: Category;

    @IsEmpty({message: 'You cannot pass user id'})
    readonly user: User
}