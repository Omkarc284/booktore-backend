import { User } from "../../auth/schemas/user.schema";
import { Category } from "../schemas/book.schemas";
import { IsNotEmpty, IsString, IsNumber, IsEnum, IsEmpty } from "class-validator";


export class CreateBookDto {
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly author: string;

    @IsNotEmpty()
    @IsNumber()
    readonly price: number;

    @IsNotEmpty()
    @IsEnum(Category, {message: 'Please enter correct category.'})
    readonly category: Category;

    @IsEmpty({message: 'You cannot pass user id'})
    readonly user: User
}