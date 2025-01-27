import { Controller, Param, Put, Get, Post, Body, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schemas';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport'

@Controller('books')
export class BookController {
    constructor(private bookService: BookService) {}

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
        return this.bookService.findAll(query)
    }

    @Post('new')
    @UseGuards(AuthGuard())
    async createBook(
        @Body()
        book: CreateBookDto,
        @Req() req
    ): Promise<Book> {
        return this.bookService.create(book, req.user);
    }

    @Get(':id')
    async getBook(
        @Param('id')
        id: string
    ): Promise<Book> {
        return this.bookService.findById(id)
    }

    @Put(':id')
    @UseGuards(AuthGuard())
    async updateBook(
        @Param('id')
        id: string,
        @Body()
        book: UpdateBookDto,
        @Req() req
    ): Promise<Book> {
        return this.bookService.updateById(id,book, req.user);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    async deleteBook(
        @Param('id')
        id: string,
        @Req() req
    ): Promise<Book> {
        return this.bookService.deleteById(id, req.user);
    }

}
