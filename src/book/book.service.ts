
import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import mongoose, {FilterQuery} from "mongoose";
import { Book } from './schemas/book.schemas';
import { Query as ExpressQuery } from 'express-serve-static-core'
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}

    async findAll(query: ExpressQuery): Promise<Book[]> {
        const resPerPage  = 10;
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)
        const keyword: { title?: { $regex: string; $options: string } } = query.keyword ? {
            title: { $regex: query.keyword.toString(), $options: 'i' },
        }: {};

        const books = await this.bookModel.find({...keyword}).limit(resPerPage).skip(skip)
        return books
    }

    async create(book: Book, user: User): Promise<Book> {
        const data = Object.assign(book, {user: user._id})
        const res = await this.bookModel.create(data)
        return res
    }
    async findById(id: string): Promise<Book> {
        const isValidId = mongoose.isValidObjectId(id)
        const book = await this.bookModel.findById(id)
        if(!isValidId){
            throw new BadRequestException('Pleaes enter correct id.')
        }
        if(!book) {
            throw new NotFoundException('Book not found')
        }
        return book
    }

    async updateById(id: string, book: Book, user: User): Promise<Book> {
        
        const bk = await this.bookModel.findById(id)
        if(! user._id.equals(bk.user)){
            
            throw new UnauthorizedException('Only the user created this resource can edit it.')
        }
        return await this.bookModel.findByIdAndUpdate(id, book,{
            new: true,
            runValidators: true
        })
    }

    async deleteById(id: string, user: User): Promise<Book> {
        const bk = await this.bookModel.findById(id)
        if(! user._id.equals(bk.user)){
            throw new UnauthorizedException('Only the user created this resource can edit it.')
        }
        return await this.bookModel.findByIdAndDelete(id)
    }

}
