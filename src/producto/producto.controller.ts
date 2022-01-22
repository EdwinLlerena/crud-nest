import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { async } from 'rxjs';
import { domainToASCII } from 'url';
import { ProdcutoDto } from './dto/producto.dto';
import { ProductoService } from './producto.service';

@Controller('producto')
export class ProductoController {
  constructor(private readonly productoServices: ProductoService) {}
  @Get()
  async getAll() {
    return await this.productoServices.getAll();
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productoServices.findById(id);
  }
  @Post()
  async create(@Body() dto: ProdcutoDto) {
    return await this.productoServices.create(dto);
  }
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProdcutoDto,
  ) {
    return await this.productoServices.update(id, dto);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productoServices.delete(id);
  }
}
